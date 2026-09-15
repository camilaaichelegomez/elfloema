#!/usr/bin/env python3
"""
Recolector de artículos científicos sobre plantas medicinales.
Fuentes: PubMed, Semantic Scholar, Europe PMC, SciELO.

Para agregar una planta: agrega una entrada a PLANTS.
Para agregar una fuente: implementa fetch_<nombre>(plant, max_results) -> list[Article]
    y agrégala a la lista SOURCES al final del archivo.
"""

import argparse
import json
import re
import time
import logging
import sys
import xml.etree.ElementTree as ET
from dataclasses import dataclass, asdict, field
from pathlib import Path
from typing import Optional

try:
    import requests
except ImportError:
    print("Dependencia faltante. Ejecuta: pip install requests")
    sys.exit(1)

# ── Configuración ──────────────────────────────────────────────────────────────

OUTPUT_DIR = Path("biblioteca-cientifica")
MAX_RESULTS_PER_SOURCE = 50
REQUEST_DELAY = 0.8  # segundos entre requests (respetar rate limits)

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s",
    handlers=[logging.StreamHandler()],
)
log = logging.getLogger(__name__)


# ── Plantas ────────────────────────────────────────────────────────────────────
# Para agregar una planta: copia un bloque, modifica los campos.
# search_terms: lista de términos que se usarán en cada fuente.

PLANTS: dict[str, dict] = {
    "matico": {
        "common_name": "Matico",
        "scientific_name": "Piper aduncum",
        "search_terms": ["Piper aduncum", "matico medicinal"],
    },
    "pitra": {
        "common_name": "Pitra",
        "scientific_name": "Myrceugenia exsucca",
        "search_terms": ["Myrceugenia exsucca", "pitra medicinal"],
    },
    "arrayan": {
        "common_name": "Arrayán",
        "scientific_name": "Luma apiculata",
        "search_terms": ["Luma apiculata", "arrayan chileno medicinal"],
    },
    "maqui": {
        "common_name": "Maqui",
        "scientific_name": "Aristotelia chilensis",
        "search_terms": ["Aristotelia chilensis", "maqui berry", "maqui antioxidant"],
    },
    "triwe": {
        # Nombre científico: Laureliopsis philippiana (tepa/triwe en mapuzungún).
        # Verificar con fuente etnobotánica local si difiere.
        "common_name": "Triwe",
        "scientific_name": "Laureliopsis philippiana",
        "search_terms": ["Laureliopsis philippiana", "triwe mapuche", "tepa medicinal"],
    },
    "chilco": {
        "common_name": "Chilco",
        "scientific_name": "Fuchsia magellanica",
        "search_terms": ["Fuchsia magellanica", "chilco medicinal", "Fuchsia magellanica biological"],
    },
    "milenrama": {
        "common_name": "Milenrama",
        "scientific_name": "Achillea millefolium",
        "search_terms": ["Achillea millefolium", "yarrow medicinal properties"],
    },
    "boldo": {
        "common_name": "Boldo",
        "scientific_name": "Peumus boldus",
        "search_terms": ["Peumus boldus", "boldo medicinal", "boldo hepatoprotective"],
    },
    "canelo": {
        "common_name": "Canelo",
        "scientific_name": "Drimys winteri",
        "search_terms": ["Drimys winteri", "canelo medicinal", "Winter's bark"],
    },
    "paico": {
        "common_name": "Paico",
        "scientific_name": "Dysphania ambrosioides",
        "search_terms": ["Dysphania ambrosioides", "Chenopodium ambrosioides", "epazote medicinal"],
    },
    "llanten": {
        "common_name": "Llantén",
        "scientific_name": "Plantago lanceolata",
        "search_terms": ["Plantago lanceolata", "ribwort plantain medicinal"],
    },
    "rosa_mosqueta": {
        "common_name": "Rosa Mosqueta",
        "scientific_name": "Rosa eglanteria",
        "search_terms": ["Rosa eglanteria", "Rosa rubiginosa", "rosa mosqueta medicinal", "rosehip oil"],
    },
    "bailahuen": {
        "common_name": "Bailahuén",
        "scientific_name": "Haplopappus baylahuen",
        "search_terms": ["Haplopappus baylahuen", "bailahuen medicinal", "Haplopappus chileno"],
    },
    "palqui": {
        "common_name": "Palqui",
        "scientific_name": "Cestrum parqui",
        "search_terms": ["Cestrum parqui", "palqui medicinal", "Cestrum parqui biological activity"],
    },
    "ayurveda": {
        "common_name": "Ayurveda",
        "scientific_name": "Tradición médica",
        "search_terms": [
            "Ayurvedic medicine phytotherapy",
            "dosha herbal medicine western",
            "Kapha Vata Pitta plants",
            "Ayurveda western phytotherapy integration",
        ],
    },
    "mtc": {
        "common_name": "Medicina Tradicional China",
        "scientific_name": "Tradición médica",
        "search_terms": [
            "Traditional Chinese Medicine phytotherapy integration",
            "TCM herbal western medicine",
            "acupressure points herbal medicine",
            "Chinese herbal medicine evidence based",
        ],
    },
    "rosa_damascena": {
        "common_name": "Rosa de Damasco",
        "scientific_name": "Rosa damascena",
        "search_terms": ["Rosa damascena", "damask rose essential oil", "Rosa damascena pharmacology"],
    },
    "sauco": {
        "common_name": "Saúco",
        "scientific_name": "Sambucus nigra",
        "search_terms": ["Sambucus nigra", "elderberry antiviral", "elderflower medicinal"],
    },
    "escaramujo": {
        "common_name": "Escaramujo",
        "scientific_name": "Rosa canina",
        "search_terms": ["Rosa canina", "rosehip anti-inflammatory", "Rosa canina vitamin C"],
    },
    "hiperico": {
        "common_name": "Hipérico",
        "scientific_name": "Hypericum perforatum",
        "search_terms": ["Hypericum perforatum", "St John wort antidepressant", "hypericin pharmacology"],
    },
    "ginkgo": {
        "common_name": "Ginkgo",
        "scientific_name": "Ginkgo biloba",
        "search_terms": ["Ginkgo biloba", "ginkgo cognitive function", "ginkgolides pharmacology"],
    },
    "ginseng": {
        "common_name": "Ginseng",
        "scientific_name": "Panax ginseng",
        "search_terms": ["Panax ginseng", "ginsenosides pharmacology", "ginseng adaptogen"],
    },
    "regaliz": {
        "common_name": "Regaliz",
        "scientific_name": "Glycyrrhiza glabra",
        "search_terms": ["Glycyrrhiza glabra", "licorice root medicinal", "glycyrrhizin pharmacology"],
    },
    "hinojo": {
        "common_name": "Hinojo",
        "scientific_name": "Foeniculum vulgare",
        "search_terms": ["Foeniculum vulgare", "fennel medicinal properties", "anethole pharmacology"],
    },
    "anis": {
        "common_name": "Anís",
        "scientific_name": "Pimpinella anisum",
        "search_terms": ["Pimpinella anisum", "anise medicinal properties", "anethole bioactivity"],
    },
    "albahaca": {
        "common_name": "Albahaca",
        "scientific_name": "Ocimum basilicum",
        "search_terms": ["Ocimum basilicum", "basil medicinal", "eugenol pharmacology"],
    },
    "cilantro": {
        "common_name": "Cilantro",
        "scientific_name": "Coriandrum sativum",
        "search_terms": ["Coriandrum sativum", "coriander medicinal", "cilantro antibacterial"],
    },
    "ajo": {
        "common_name": "Ajo",
        "scientific_name": "Allium sativum",
        "search_terms": ["Allium sativum", "garlic antimicrobial", "allicin pharmacology"],
    },
    "cebolla": {
        "common_name": "Cebolla",
        "scientific_name": "Allium cepa",
        "search_terms": ["Allium cepa", "onion quercetin medicinal", "Allium cepa antioxidant"],
    },
    "aloe_vera": {
        "common_name": "Aloe Vera",
        "scientific_name": "Aloe barbadensis",
        "search_terms": ["Aloe barbadensis", "Aloe vera wound healing", "aloesin pharmacology"],
    },
    "calendula": {
        "common_name": "Caléndula",
        "scientific_name": "Calendula officinalis",
        "search_terms": ["Calendula officinalis", "calendula anti-inflammatory", "triterpenoids wound healing"],
    },
    "arnica": {
        "common_name": "Árnica",
        "scientific_name": "Arnica montana",
        "search_terms": ["Arnica montana", "arnica anti-inflammatory", "helenalin pharmacology"],
    },
    "hamamelis": {
        "common_name": "Hamamelis",
        "scientific_name": "Hamamelis virginiana",
        "search_terms": ["Hamamelis virginiana", "witch hazel astringent", "hamamelitannin pharmacology"],
    },
    "te_verde": {
        "common_name": "Té verde",
        "scientific_name": "Camellia sinensis",
        "search_terms": ["Camellia sinensis", "green tea EGCG antioxidant", "catechins pharmacology"],
    },
    "moringa": {
        "common_name": "Moringa",
        "scientific_name": "Moringa oleifera",
        "search_terms": ["Moringa oleifera", "moringa nutritional medicinal", "isothiocyanates pharmacology"],
    },
    "espirulina": {
        "common_name": "Espirulina",
        "scientific_name": "Spirulina platensis",
        "search_terms": ["Spirulina platensis", "spirulina antioxidant", "phycocyanin pharmacology"],
    },
    "menta": {
        "common_name": "Menta",
        "scientific_name": "Mentha piperita",
        "search_terms": ["Mentha piperita", "peppermint medicinal", "Mentha piperita pharmacology"],
    },
    "melisa": {
        "common_name": "Melisa",
        "scientific_name": "Melissa officinalis",
        "search_terms": ["Melissa officinalis", "lemon balm medicinal", "Melissa officinalis pharmacology"],
    },
    "jengibre": {
        "common_name": "Jengibre",
        "scientific_name": "Zingiber officinale",
        "search_terms": ["Zingiber officinale", "ginger medicinal properties", "gingerol bioactivity"],
    },
    "canela_ceylan": {
        "common_name": "Canela de Ceylán",
        "scientific_name": "Cinnamomum verum",
        "search_terms": ["Cinnamomum verum", "Ceylon cinnamon medicinal", "cinnamaldehyde pharmacology"],
    },
    "pimienta_negra": {
        "common_name": "Pimienta negra",
        "scientific_name": "Piper nigrum",
        "search_terms": ["Piper nigrum", "piperine bioavailability", "black pepper medicinal"],
    },
    "curcuma": {
        "common_name": "Cúrcuma",
        "scientific_name": "Curcuma longa",
        "search_terms": ["Curcuma longa", "curcumin anti-inflammatory", "turmeric medicinal"],
    },
    "romero": {
        "common_name": "Romero",
        "scientific_name": "Rosmarinus officinalis",
        "search_terms": ["Rosmarinus officinalis", "rosemary medicinal", "rosmarinic acid pharmacology"],
    },
    "tomillo": {
        "common_name": "Tomillo",
        "scientific_name": "Thymus vulgaris",
        "search_terms": ["Thymus vulgaris", "thymol antimicrobial", "thyme medicinal properties"],
    },
    "oregano": {
        "common_name": "Orégano",
        "scientific_name": "Origanum vulgare",
        "search_terms": ["Origanum vulgare", "oregano essential oil", "carvacrol biological activity"],
    },
    "sauce_blanco": {
        "common_name": "Sauce blanco",
        "scientific_name": "Salix alba",
        "search_terms": ["Salix alba", "white willow medicinal", "salicin anti-inflammatory"],
    },
    "lavanda": {
        "common_name": "Lavanda",
        "scientific_name": "Lavandula angustifolia",
        "search_terms": ["Lavandula angustifolia", "lavender anxiolytic", "linalool pharmacology"],
    },
    "manzanilla": {
        "common_name": "Manzanilla",
        "scientific_name": "Matricaria chamomilla",
        "search_terms": ["Matricaria chamomilla", "chamomile anti-inflammatory", "apigenin pharmacology"],
    },
    "valeriana": {
        "common_name": "Valeriana",
        "scientific_name": "Valeriana officinalis",
        "search_terms": ["Valeriana officinalis", "valerian sedative", "valerenic acid pharmacology"],
    },
    "echinacea": {
        "common_name": "Equinácea",
        "scientific_name": "Echinacea purpurea",
        "search_terms": ["Echinacea purpurea", "echinacea immunostimulant", "echinacea clinical trial"],
    },
    "ashwagandha": {
        "common_name": "Ashwagandha",
        "scientific_name": "Withania somnifera",
        "search_terms": ["Withania somnifera", "ashwagandha adaptogen", "withanolides pharmacology"],
    },
    "tulsi": {
        "common_name": "Tulsi",
        "scientific_name": "Ocimum tenuiflorum",
        "search_terms": ["Ocimum tenuiflorum", "holy basil medicinal", "Ocimum sanctum adaptogen"],
    },
    "cardo_mariano": {
        "common_name": "Cardo mariano",
        "scientific_name": "Silybum marianum",
        "search_terms": ["Silybum marianum", "silymarin hepatoprotective", "milk thistle medicinal"],
    },
    "diente_de_leon": {
        "common_name": "Diente de León",
        "scientific_name": "Taraxacum officinale",
        "search_terms": ["Taraxacum officinale", "dandelion medicinal", "taraxacum diuretic"],
    },
    "cola_de_caballo": {
        "common_name": "Cola de caballo",
        "scientific_name": "Equisetum arvense",
        "search_terms": ["Equisetum arvense", "horsetail medicinal", "Equisetum silica pharmacology"],
    },
    "ortiga": {
        "common_name": "Ortiga",
        "scientific_name": "Urtica dioica",
        "search_terms": ["Urtica dioica", "stinging nettle medicinal", "urtica anti-inflammatory"],
    },
    "fundamentos_metabolitos": {
        "common_name": "Metabolitos secundarios",
        "scientific_name": "Temática",
        "folder": "fundamentos/metabolitos",
        "search_terms": [
            "flavonoids mechanism of action",
            "terpenes bioactivity",
            "alkaloids pharmacology",
            "tannins biological activity",
            "saponins health effects",
        ],
    },
    "fundamentos_sinergias": {
        "common_name": "Sinergias fitoquímicas",
        "scientific_name": "Temática",
        "folder": "fundamentos/sinergias",
        "search_terms": [
            "herbal synergy",
            "plant compounds synergistic effect",
            "phytochemical interactions",
            "bioavailability enhancers plants",
        ],
    },
    "fundamentos_sistemas": {
        "common_name": "Sistemas y fitoquímicos",
        "scientific_name": "Temática",
        "folder": "fundamentos/sistemas",
        "search_terms": [
            "gut microbiome herbs",
            "inflammation natural compounds",
            "nervous system adaptogenic plants",
            "skin barrier phytochemicals",
        ],
    },
    "yoga_terapeutico": {
        "common_name": "Yoga Terapéutico",
        "scientific_name": "Temática",
        "search_terms": [
            "yoga therapeutic effects organs",
            "yoga liver detoxification",
            "yoga digestive system benefits",
            "yoga twisting poses physiological effects",
            "pranayama breathing effects body",
            "yoga nervous system parasympathetic",
            "yoga inflammation reduction clinical",
        ],
    },
    "acupuntura_meridianos": {
        "common_name": "Acupuntura y Meridianos",
        "scientific_name": "Temática",
        "search_terms": [
            "acupuncture meridian points evidence",
            "acupressure liver gallbladder points",
            "TCM meridian organ system",
            "acupuncture digestive disorders clinical",
            "acupuncture anti-inflammatory mechanism",
            "traditional chinese medicine organ energy",
        ],
    },
    "ayurveda_clinica": {
        "common_name": "Ayurveda Clínica",
        "scientific_name": "Temática",
        "search_terms": [
            "Ayurveda clinical evidence dosha",
            "Pitta Vata Kapha herbal treatment",
            "Ayurvedic herbs liver hepatoprotective",
            "Ayurveda digestive system agni",
            "Ayurveda western medicine integration",
            "Ayurvedic rasayana rejuvenation",
        ],
    },
    "medicina_integrativa": {
        "common_name": "Medicina Integrativa",
        "scientific_name": "Temática",
        "search_terms": [
            "integrative medicine lifestyle habits",
            "circadian rhythm organ health",
            "gut microbiome herbal medicine",
            "anti-inflammatory diet medicinal plants",
            "mind body medicine evidence",
            "naturopathic medicine clinical evidence",
        ],
    },
    "chakras_energia": {
        "common_name": "Chakras y Energía",
        "scientific_name": "Temática",
        "search_terms": [
            "chakra energy system scientific review",
            "subtle energy body medicine",
            "biofield therapy clinical evidence",
            "energy medicine integrative health",
            "prana vital energy yoga science",
        ],
    },

    # -- Yoga -----------------------------------------------------------------
    # Un tema por objetivo de practica: la app de rutinas necesita saber que
    # esta probado para CADA cosa que alguien puede querer trabajar, y que no.
    # Todo va a la carpeta yoga/ para no mezclarlo con las plantas.
    "yoga_dolor_espalda": {
        "common_name": "Yoga y dolor de espalda",
        "scientific_name": "Tematica",
        "folder": "yoga/dolor_espalda",
        "search_terms": [
            "yoga chronic low back pain randomized trial",
            "yoga versus physical therapy back pain",
            "yoga neck pain randomized controlled trial",
            "yoga sciatica lumbar disc",
            "yoga core stability lumbar muscles",
            "Iyengar yoga back pain trial",
        ],
    },
    "yoga_ansiedad_estres": {
        "common_name": "Yoga, ansiedad y estres",
        "scientific_name": "Tematica",
        "folder": "yoga/ansiedad_estres",
        "search_terms": [
            "yoga anxiety randomized controlled trial",
            "yoga depression meta-analysis",
            "yoga cortisol stress biomarkers",
            "yoga heart rate variability vagal tone",
            "yoga PTSD trauma trial",
            "yoga GABA brain neuroimaging",
        ],
    },
    "yoga_sueno_nidra": {
        "common_name": "Yoga, sueno y yoga nidra",
        "scientific_name": "Tematica",
        "folder": "yoga/sueno_nidra",
        "search_terms": [
            "yoga insomnia sleep quality randomized",
            "yoga nidra sleep trial",
            "yoga nidra autonomic dopamine",
            "restorative yoga sleep older adults",
            "yoga melatonin sleep",
        ],
    },
    "yoga_pranayama": {
        "common_name": "Pranayama y respiracion",
        "scientific_name": "Tematica",
        "folder": "yoga/pranayama",
        "search_terms": [
            "pranayama randomized controlled trial",
            "slow breathing heart rate variability baroreflex",
            "nadi shodhana alternate nostril breathing effects",
            "kapalabhati bhastrika physiological effects",
            "bhramari humming breathing nitric oxide",
            "ujjayi breathing respiratory physiology",
            "breathing exercises blood pressure meta-analysis",
        ],
    },
    "yoga_menstrual_hormonal": {
        "common_name": "Yoga, ciclo y hormonas",
        "scientific_name": "Tematica",
        "folder": "yoga/menstrual_hormonal",
        "search_terms": [
            "yoga dysmenorrhea menstrual pain trial",
            "yoga premenstrual syndrome randomized",
            "yoga polycystic ovary syndrome PCOS",
            "yoga menopause hot flashes randomized",
            "yoga inversions menstruation evidence",
        ],
    },
    "yoga_embarazo": {
        "common_name": "Yoga y embarazo",
        "scientific_name": "Tematica",
        "folder": "yoga/embarazo",
        "search_terms": [
            "prenatal yoga randomized controlled trial",
            "yoga pregnancy safety adverse outcomes",
            "yoga labor pain duration trial",
            "yoga pregnancy anxiety depression",
            "supine position pregnancy hemodynamics",
        ],
    },
    "yoga_fuerza_flexibilidad": {
        "common_name": "Yoga, fuerza y flexibilidad",
        "scientific_name": "Tematica",
        "folder": "yoga/fuerza_flexibilidad",
        "search_terms": [
            "yoga flexibility range of motion trial",
            "yoga muscular strength endurance randomized",
            "yoga balance proprioception trial",
            "stretching duration flexibility adaptation",
            "yoga bone mineral density",
            "hamstring stretching connective tissue adaptation",
        ],
    },
    "yoga_cardio_metabolico": {
        "common_name": "Yoga, corazon y metabolismo",
        "scientific_name": "Tematica",
        "folder": "yoga/cardio_metabolico",
        "search_terms": [
            "yoga hypertension blood pressure meta-analysis",
            "yoga type 2 diabetes glycemic control",
            "yoga lipid profile metabolic syndrome",
            "yoga cardiorespiratory fitness VO2",
            "yoga cardiac rehabilitation trial",
        ],
    },
    "yoga_seguridad_lesiones": {
        "common_name": "Seguridad y lesiones en yoga",
        "scientific_name": "Tematica",
        "folder": "yoga/seguridad_lesiones",
        "search_terms": [
            "yoga adverse events",
            "yoga injury",
            "yoga safety",
            "yoga musculoskeletal pain onset",
            "intraocular pressure yoga",
            "inversion posture intraocular pressure",
            "headstand injury",
            "yoga contraindications",
            "exercise hypermobility injury",
            "stretching injury risk",
        ],
    },
    "yoga_estilos_comparados": {
        "common_name": "Estilos de yoga comparados",
        "scientific_name": "Tematica",
        "folder": "yoga/estilos_comparados",
        "search_terms": [
            "hatha yoga versus vinyasa energy expenditure",
            "Iyengar yoga props alignment clinical",
            "yin yoga fascia connective tissue",
            "restorative yoga clinical trial",
            "Ashtanga yoga physiological demands",
            "Kundalini yoga randomized trial",
            "chair yoga feasibility trial",
            "hot yoga Bikram randomized trial",
        ],
    },
    "yoga_meditacion_mindfulness": {
        "common_name": "Meditacion y mindfulness",
        "scientific_name": "Tematica",
        "folder": "yoga/meditacion_mindfulness",
        "search_terms": [
            "mindfulness meditation randomized controlled trial",
            "meditation attention cognitive function",
            "body scan relaxation response physiology",
            "mantra meditation blood pressure",
            "meditation adverse effects",
        ],
    },
    "yoga_mayores_movilidad": {
        "common_name": "Yoga en personas mayores",
        "scientific_name": "Tematica",
        "folder": "yoga/mayores_movilidad",
        "search_terms": [
            "yoga older adults falls balance randomized",
            "chair yoga older adults osteoarthritis",
            "yoga osteoporosis spinal flexion fracture",
            "yoga knee osteoarthritis trial",
            "yoga mobility frailty elderly",
        ],
    },
    "yoga_digestivo": {
        "common_name": "Yoga y digestion",
        "scientific_name": "Tematica",
        "folder": "yoga/digestivo",
        "search_terms": [
            "yoga irritable bowel syndrome randomized",
            "yoga constipation gastrointestinal motility",
            "yoga gut brain axis vagus",
            "abdominal massage twisting digestion physiology",
        ],
    },
    "yoga_inflamacion_inmunidad": {
        "common_name": "Yoga, inflamacion e inmunidad",
        "scientific_name": "Tematica",
        "folder": "yoga/inflamacion_inmunidad",
        "search_terms": [
            "yoga inflammatory markers IL-6 CRP randomized",
            "yoga immune function trial",
            "yoga telomerase cellular aging",
            "mind body practices gene expression inflammation",
        ],
    },
    "yoga_dolor_cronico": {
        "common_name": "Yoga y dolor cronico",
        "scientific_name": "Tematica",
        "folder": "yoga/dolor_cronico",
        "search_terms": [
            "yoga fibromyalgia randomized controlled trial",
            "yoga chronic pain central sensitization",
            "yoga migraine headache trial",
            "yoga rheumatoid arthritis trial",
            "yoga carpal tunnel wrist",
        ],
    },
    "yoga_postura_escritorio": {
        "common_name": "Yoga, postura y trabajo sentado",
        "scientific_name": "Tematica",
        "folder": "yoga/postura_escritorio",
        "search_terms": [
            "yoga office workers neck shoulder pain trial",
            "forward head posture exercise intervention",
            "thoracic mobility exercise kyphosis",
            "sedentary behavior movement breaks musculoskeletal",
            "hip flexor tightness sitting exercise",
        ],
    },
}


# ── Modelo de datos ────────────────────────────────────────────────────────────

@dataclass
class Article:
    title: str
    source: str
    authors: list[str] = field(default_factory=list)
    year: Optional[int] = None
    abstract: Optional[str] = None
    doi: Optional[str] = None
    pdf_url: Optional[str] = None
    url: Optional[str] = None
    journal: Optional[str] = None


def _clean(text: Optional[str]) -> Optional[str]:
    if not text:
        return None
    cleaned = " ".join(str(text).split()).strip()
    return cleaned or None


def _deduplicate(articles: list[Article]) -> list[Article]:
    """Elimina duplicados por DOI (si existe) o por título normalizado."""
    seen_dois: set[str] = set()
    seen_titles: set[str] = set()
    unique = []
    for a in articles:
        norm = a.title.lower().strip()
        if a.doi and a.doi in seen_dois:
            continue
        if norm in seen_titles:
            continue
        if a.doi:
            seen_dois.add(a.doi)
        seen_titles.add(norm)
        unique.append(a)
    return unique


# ── Fetcher: PubMed ────────────────────────────────────────────────────────────

_PUBMED_ESEARCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
_PUBMED_EFETCH  = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"


def fetch_pubmed(plant: dict, max_results: int = MAX_RESULTS_PER_SOURCE) -> list[Article]:
    """Busca artículos en PubMed via NCBI Entrez E-utilities (sin API key).
    Incluye resultados en inglés, español, alemán y portugués."""
    base_query = " OR ".join(f'"{t}"' for t in plant["search_terms"])
    # Filtro explícito de idiomas para capturar literatura en DE y PT además de EN/ES
    lang_filter = "(english[la] OR spanish[la] OR german[la] OR portuguese[la] OR french[la])"
    query = f"({base_query}) AND {lang_filter}"

    try:
        r = requests.get(_PUBMED_ESEARCH, params={
            "db": "pubmed", "term": query,
            "retmax": max_results, "retmode": "json",
        }, timeout=15)
        r.raise_for_status()
        ids = r.json().get("esearchresult", {}).get("idlist", [])
    except Exception as e:
        log.warning(f"PubMed esearch: {e}")
        return []

    if not ids:
        return []

    time.sleep(REQUEST_DELAY)

    try:
        r = requests.get(_PUBMED_EFETCH, params={
            "db": "pubmed", "id": ",".join(ids),
            "retmode": "xml", "rettype": "abstract",
        }, timeout=30)
        r.raise_for_status()
        root = ET.fromstring(r.content)
    except Exception as e:
        log.warning(f"PubMed efetch: {e}")
        return []

    articles = []
    for pub in root.findall(".//PubmedArticle"):
        try:
            articles.append(_parse_pubmed_article(pub))
        except Exception as e:
            log.debug(f"PubMed parse error: {e}")

    return articles


def _parse_pubmed_article(pub: ET.Element) -> Article:
    title = _clean(pub.findtext(".//ArticleTitle")) or "Sin título"

    authors = []
    for author in pub.findall(".//AuthorList/Author"):
        last = (author.findtext("LastName") or "").strip()
        fore = (author.findtext("ForeName") or "").strip()
        if last:
            authors.append(f"{last}, {fore}".strip(", "))

    year = None
    for xpath in (".//PubDate/Year", ".//PubDate/MedlineDate"):
        el = pub.find(xpath)
        if el is not None and el.text:
            try:
                year = int(el.text[:4])
                break
            except ValueError:
                pass

    abstract_parts = [el.text for el in pub.findall(".//AbstractText") if el.text]
    abstract = _clean(" ".join(abstract_parts)) if abstract_parts else None

    ids: dict[str, str] = {}
    for id_el in pub.findall(".//ArticleId"):
        id_type = id_el.get("IdType")
        if id_type and id_el.text:
            ids[id_type] = id_el.text.strip()

    pmcid = ids.get("pmc")
    pmid  = ids.get("pubmed")
    doi   = ids.get("doi")

    pdf_url = f"https://www.ncbi.nlm.nih.gov/pmc/articles/{pmcid}/pdf/" if pmcid else None
    url     = f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/" if pmid else None
    journal = pub.findtext(".//Journal/Title") or pub.findtext(".//MedlineTA")

    return Article(
        title=title, authors=authors, year=year, abstract=abstract,
        doi=doi, pdf_url=pdf_url, url=url, journal=_clean(journal),
        source="PubMed",
    )


# ── Fetcher: Semantic Scholar ──────────────────────────────────────────────────

_SS_SEARCH = "https://api.semanticscholar.org/graph/v1/paper/search"
_SS_FIELDS = "title,authors,year,abstract,externalIds,openAccessPdf,journal,url"


def _ss_fetch_with_retry(params: dict, max_retries: int = 4) -> list:
    """GET a Semantic Scholar con backoff exponencial en 429."""
    for attempt in range(max_retries):
        try:
            r = requests.get(_SS_SEARCH, params=params, timeout=20)
            if r.status_code == 429:
                wait = 5 * (2 ** attempt)  # 5 → 10 → 20 → 40 s
                log.info(f"  Semantic Scholar rate limit — esperando {wait}s (intento {attempt + 1}/{max_retries})")
                time.sleep(wait)
                continue
            r.raise_for_status()
            return r.json().get("data", [])
        except requests.exceptions.HTTPError as e:
            log.warning(f"Semantic Scholar HTTP error: {e}")
            return []
        except Exception as e:
            log.warning(f"Semantic Scholar error: {e}")
            return []
    log.warning("Semantic Scholar: agotados los reintentos por rate limit")
    return []


def fetch_semantic_scholar(plant: dict, max_results: int = MAX_RESULTS_PER_SOURCE) -> list[Article]:
    """Busca artículos en Semantic Scholar via API pública gratuita."""
    articles: list[Article] = []
    seen_ids: set[str] = set()
    per_term = max(max_results // len(plant["search_terms"]), 10)

    for term in plant["search_terms"]:
        data = _ss_fetch_with_retry({
            "query": term,
            "limit": min(per_term, 100),
            "fields": _SS_FIELDS,
        })

        for paper in data:
            pid = paper.get("paperId")
            if pid in seen_ids:
                continue
            seen_ids.add(pid)

            ext     = paper.get("externalIds") or {}
            oap     = paper.get("openAccessPdf") or {}
            journal = (paper.get("journal") or {}).get("name")

            articles.append(Article(
                title=_clean(paper.get("title")) or "Sin título",
                authors=[a.get("name", "") for a in (paper.get("authors") or [])],
                year=paper.get("year"),
                abstract=_clean(paper.get("abstract")),
                doi=ext.get("DOI"),
                pdf_url=oap.get("url"),
                url=paper.get("url"),
                journal=_clean(journal),
                source="Semantic Scholar",
            ))

        time.sleep(3)  # Semantic Scholar: sin API key → ~1 req/3 s

    return _deduplicate(articles)[:max_results]


# ── Fetcher: Europe PMC ────────────────────────────────────────────────────────

_EPMC_SEARCH = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"


def fetch_europe_pmc(plant: dict, max_results: int = MAX_RESULTS_PER_SOURCE) -> list[Article]:
    """Busca artículos en Europe PMC via REST API."""
    query = " OR ".join(f'"{t}"' for t in plant["search_terms"])

    try:
        r = requests.get(_EPMC_SEARCH, params={
            "query": query,
            "format": "json",
            "pageSize": max_results,
            "resultType": "core",
        }, timeout=30)
        r.raise_for_status()
        results = r.json().get("resultList", {}).get("result", [])
    except Exception as e:
        log.warning(f"Europe PMC: {e}")
        return []

    articles = []
    for item in results:
        pmcid = item.get("pmcid", "")
        doi   = item.get("doi")

        pdf_url = None
        for link in (item.get("fullTextUrlList") or {}).get("fullTextUrl", []):
            if link.get("documentStyle") == "pdf":
                pdf_url = link.get("url")
                break

        authors_list = []
        for a in (item.get("authorList") or {}).get("author", []):
            name = a.get("fullName") or (
                f"{a.get('lastName', '')}, {a.get('firstName', '')}".strip(", ")
            )
            if name:
                authors_list.append(name)

        year = None
        if item.get("pubYear"):
            try:
                year = int(item["pubYear"])
            except ValueError:
                pass

        url = None
        if pmcid:
            url = f"https://europepmc.org/article/PMC/{pmcid.replace('PMC', '')}"
        elif doi:
            url = f"https://doi.org/{doi}"

        articles.append(Article(
            title=_clean(item.get("title")) or "Sin título",
            authors=authors_list,
            year=year,
            abstract=_clean(item.get("abstractText")),
            doi=doi,
            pdf_url=pdf_url,
            url=url,
            journal=_clean(item.get("journalTitle")),
            source="Europe PMC",
        ))

    return articles


# ── Fetcher: SciELO ────────────────────────────────────────────────────────────
# Usa la interfaz pública search.scielo.org con salida en formato RIS.
# El endpoint SOLR interno (solr.scielo.org) no es DNS-público.

_SCIELO_SEARCH = "https://search.scielo.org/"


def _parse_ris(text: str, source: str) -> list[Article]:
    """Parsea respuesta en formato RIS a lista de Article."""
    articles = []
    current: dict = {}

    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        if line.startswith("ER  -"):
            if current.get("TI"):
                year_val = current.get("PY")
                articles.append(Article(
                    title=_clean(current["TI"]) or "Sin título",
                    authors=current.get("_authors", []),
                    year=year_val,
                    abstract=_clean(current.get("AB")),
                    doi=current.get("DO"),
                    pdf_url=current.get("L1"),
                    url=current.get("UR") or current.get("LK"),
                    journal=_clean(
                        current.get("JO") or current.get("JF") or current.get("T2")
                    ),
                    source=source,
                ))
            current = {}
            continue

        if "  - " not in line:
            continue

        tag, _, value = line.partition("  - ")
        tag = tag.strip()
        value = value.strip()

        if tag == "AU":
            current.setdefault("_authors", []).append(value)
        elif tag == "PY":
            try:
                current["PY"] = int(value[:4])
            except ValueError:
                pass
        else:
            current[tag] = value

    return articles


def fetch_scielo(plant: dict, max_results: int = MAX_RESULTS_PER_SOURCE) -> list[Article]:
    """Busca artículos en SciELO via search.scielo.org (salida RIS)."""
    query = " OR ".join(f'"{t}"' for t in plant["search_terms"])

    headers = {"User-Agent": "Mozilla/5.0 (compatible; PlantMedicineBot/1.0; research use)"}
    try:
        r = requests.get(_SCIELO_SEARCH, params={
            "q": query,
            "lang": "en",
            "count": max_results,
            "from": 0,
            "output": "ris",
        }, headers=headers, timeout=20)
        r.raise_for_status()
        return _parse_ris(r.text, source="SciELO")
    except Exception as e:
        log.warning(f"SciELO: {e}")
        return []


# ── Fetcher: Redalyc ──────────────────────────────────────────────────────────
# Redalyc es el repositorio latinoamericano más grande — fuerte en Chile/Brasil.
# Usa la API REST pública de búsqueda (JSON).

_REDALYC_SEARCH = "https://www.redalyc.org/redalyc/find/articleSearchByTerm.action"


def fetch_redalyc(plant: dict, max_results: int = MAX_RESULTS_PER_SOURCE) -> list[Article]:
    """Busca artículos en Redalyc (base latinoamericana) via API pública."""
    articles: list[Article] = []
    seen_titles: set[str] = set()
    per_term = max(max_results // len(plant["search_terms"]), 5)
    headers = {"User-Agent": "Mozilla/5.0 (compatible; BibliotecaBotanica/1.0; research)"}

    for term in plant["search_terms"]:
        try:
            r = requests.get(_REDALYC_SEARCH, params={
                "term": term,
                "paginaActual": 1,
                "num": per_term,
            }, headers=headers, timeout=20)
            r.raise_for_status()
            data = r.json()
        except Exception as e:
            log.warning(f"Redalyc [{term}]: {e}")
            time.sleep(REQUEST_DELAY)
            continue

        for item in (data.get("result") or data.get("results") or data.get("items") or []):
            title = _clean(
                item.get("titulo") or item.get("title") or item.get("tituloArticulo") or ""
            )
            if not title or title.lower() in seen_titles:
                continue
            seen_titles.add(title.lower())

            authors_raw = item.get("autores") or item.get("authors") or item.get("autor") or []
            if isinstance(authors_raw, str):
                authors_raw = [authors_raw]
            authors = [a.get("nombre", a) if isinstance(a, dict) else str(a) for a in authors_raw]

            year = None
            for key in ("anio", "year", "fecha", "publishedYear"):
                v = item.get(key)
                if v:
                    try:
                        year = int(str(v)[:4])
                        break
                    except ValueError:
                        pass

            doi  = item.get("doi") or item.get("DOI")
            url  = item.get("url") or item.get("link") or item.get("urlArticulo")
            if not url and doi:
                url = f"https://doi.org/{doi}"

            journal = _clean(item.get("revista") or item.get("journal") or item.get("nombreRevista"))
            abstract = _clean(item.get("resumen") or item.get("abstract") or item.get("descripcion"))

            articles.append(Article(
                title=title,
                authors=authors,
                year=year,
                abstract=abstract,
                doi=doi,
                pdf_url=item.get("urlPdf") or item.get("pdfUrl"),
                url=url,
                journal=journal,
                source="Redalyc",
            ))

        time.sleep(REQUEST_DELAY)

    return articles[:max_results]


# ── Fetcher: Internet Archive ──────────────────────────────────────────────────
# Busca libros/textos en archive.org. No se incluye en SOURCES porque solo
# aplica a temas específicos via sources_override en la entrada PLANTS.

_IA_SEARCH = "https://archive.org/advancedsearch.php"


def fetch_internet_archive(plant: dict, max_results: int = MAX_RESULTS_PER_SOURCE) -> list[Article]:
    """Busca libros en Internet Archive via API pública."""
    articles: list[Article] = []
    seen_ids: set[str] = set()
    per_term = max(max_results // len(plant["search_terms"]), 10)

    for term in plant["search_terms"]:
        params = [
            ("q", f'({term}) AND mediatype:texts AND -mediatype:audio'),
            ("fl[]", "identifier"), ("fl[]", "title"), ("fl[]", "creator"),
            ("fl[]", "date"),      ("fl[]", "description"),
            ("rows", per_term), ("page", 1), ("output", "json"),
            ("sort[]", "downloads desc"),
        ]
        try:
            r = requests.get(_IA_SEARCH, params=params, timeout=15)
            r.raise_for_status()
            docs = r.json().get("response", {}).get("docs", [])
        except Exception as e:
            log.warning(f"Internet Archive [{term}]: {e}")
            time.sleep(REQUEST_DELAY)
            continue

        for doc in docs:
            identifier = doc.get("identifier")
            if not identifier or identifier in seen_ids:
                continue
            seen_ids.add(identifier)

            creator = doc.get("creator") or []
            if isinstance(creator, str):
                creator = [creator]

            year = None
            date_raw = doc.get("date")
            if date_raw:
                try:
                    year = int(str(date_raw)[:4])
                except (ValueError, TypeError):
                    pass

            description = doc.get("description") or ""
            if isinstance(description, list):
                description = " ".join(description)

            articles.append(Article(
                title=_clean(doc.get("title")) or "Sin título",
                authors=creator,
                year=year,
                abstract=_clean(description),
                doi=None,
                pdf_url=f"https://archive.org/download/{identifier}/{identifier}.pdf",
                url=f"https://archive.org/details/{identifier}",
                journal=None,
                source="Internet Archive",
            ))

        time.sleep(REQUEST_DELAY)

    return _deduplicate(articles)[:max_results]


# Entrada especial de libros — fuera del dict PLANTS para poder referenciar
# fetch_internet_archive, que se define arriba.
PLANTS["libros"] = {
    "common_name": "Libros",
    "scientific_name": "Internet Archive",
    "folder": "libros",
    "sources_override": [fetch_internet_archive],
    "search_terms": [
        "medicinal plants",
        "etnobotanica chilena",
        "Ayurveda herbal medicine",
        "plantas medicinales Chile",
        "mapuche medicine plants",
        "fitoterapia plantas",
    ],
}

# -- Ampliación: ciencia cosmética, rostro y nativas de Chile -------------------
# Tres huecos que tenía la biblioteca:
#   1. Casi todo eran plantas. De cómo se formula (conservación, emulsión, pH,
#      penetración) solo estaban "piel" y "fundamentos".
#   2. Cero artículos sobre drenaje linfático y ejercicios faciales: solo libros.
#   3. Faltaban nativas chilenas con literatura propia y activos del inventario.

PLANTS.update({
    # -- Cómo se formula --
    "conservacion_cosmetica": {
        "common_name": "Conservación cosmética",
        "scientific_name": "Temática",
        "search_terms": [
            "cosmetic preservative efficacy challenge test",
            "natural preservative cosmetics antimicrobial",
            "microbiological contamination cosmetic products",
            "water activity cosmetic microbial growth",
        ],
    },
    "emulsiones": {
        "common_name": "Emulsiones y emulsionantes",
        "scientific_name": "Temática",
        "search_terms": [
            "cosmetic emulsion stability emulsifier HLB",
            "oil in water emulsion skin cream formulation",
            "natural emulsifier cosmetic stability",
        ],
    },
    "ph_barrera_cutanea": {
        "common_name": "pH y barrera cutánea",
        "scientific_name": "Temática",
        "search_terms": [
            "skin surface pH acid mantle barrier function",
            "stratum corneum barrier lipids ceramides",
            "transepidermal water loss skin measurement",
        ],
    },
    "penetracion_cutanea": {
        "common_name": "Penetración cutánea",
        "scientific_name": "Temática",
        "search_terms": [
            "percutaneous absorption skin penetration cosmetic ingredient",
            "penetration enhancer topical formulation",
            "in vitro skin permeation Franz cell",
        ],
    },
    "microbioma_cutaneo": {
        "common_name": "Microbioma cutáneo",
        "scientific_name": "Temática",
        "search_terms": [
            "skin microbiome cosmetic products effect",
            "Cutibacterium acnes skin microbiota",
            "prebiotic postbiotic skin care",
        ],
    },
    "antioxidantes_topicos": {
        "common_name": "Antioxidantes tópicos",
        "scientific_name": "Temática",
        "search_terms": [
            "topical antioxidant skin oxidative stress",
            "polyphenols skin photoprotection topical",
            "vitamin E tocopherol skin topical",
        ],
    },
    "vitamina_c_topica": {
        "common_name": "Vitamina C tópica",
        "scientific_name": "Ascorbic acid",
        "search_terms": [
            "topical ascorbic acid skin clinical",
            "vitamin C derivative stability cosmetic formulation",
            "ascorbic acid collagen synthesis skin",
        ],
    },
    "niacinamida": {
        "common_name": "Niacinamida",
        "scientific_name": "Nicotinamide",
        "search_terms": [
            "topical niacinamide skin clinical trial",
            "nicotinamide barrier function sebum",
            "niacinamide hyperpigmentation topical",
        ],
    },
    "fotoproteccion": {
        "common_name": "Fotoprotección",
        "scientific_name": "Temática",
        "search_terms": [
            "zinc oxide titanium dioxide sunscreen efficacy",
            "mineral sunscreen SPF in vitro testing",
            "sunscreen photostability formulation",
        ],
    },
    "tensioactivos_jabon": {
        "common_name": "Tensioactivos y jabón",
        "scientific_name": "Temática",
        "search_terms": [
            "surfactant skin irritation cleanser mildness",
            "saponification soap chemistry",
            "syndet bar skin pH cleansing",
        ],
    },
    "aceites_vegetales": {
        "common_name": "Aceites vegetales en la piel",
        "scientific_name": "Temática",
        "search_terms": [
            "plant oil topical skin barrier fatty acid composition",
            "linoleic acid oleic acid skin barrier topical",
            "vegetable oil comedogenicity skin",
        ],
    },
    "extraccion_activos": {
        "common_name": "Extracción de activos",
        "scientific_name": "Temática",
        "search_terms": [
            "plant extraction method polyphenol yield comparison",
            "ultrasound assisted extraction plant bioactive",
            "maceration infusion extraction medicinal plant",
        ],
    },
    "arcillas_cosmetica": {
        "common_name": "Arcillas en cosmética",
        "scientific_name": "Temática",
        "search_terms": [
            "clay mask cosmetic bentonite kaolin skin",
            "clay mineral dermatological application",
            "montmorillonite topical skin",
        ],
    },

    # -- Rostro: drenaje y ejercicio facial --
    "drenaje_linfatico": {
        "common_name": "Drenaje linfático",
        "scientific_name": "Temática",
        "search_terms": [
            "manual lymphatic drainage randomized controlled trial",
            "lymphatic drainage facial edema",
            "manual lymph drainage lymphedema systematic review",
            "lymphatic system anatomy head neck drainage",
        ],
    },
    "ejercicios_faciales": {
        "common_name": "Ejercicios faciales",
        "scientific_name": "Temática",
        "search_terms": [
            "facial exercise aging appearance clinical trial",
            "face yoga facial muscle tone",
            "facial muscle exercise rejuvenation",
        ],
    },
    "masaje_facial": {
        "common_name": "Masaje facial",
        "scientific_name": "Temática",
        "search_terms": [
            "facial massage skin effect clinical",
            "massage skin blood flow microcirculation",
            "facial massage wrinkle device",
        ],
    },

    # -- Activos que ya usa --
    "centella_asiatica": {
        "common_name": "Centella asiática",
        "scientific_name": "Centella asiatica",
        "search_terms": [
            "Centella asiatica wound healing topical",
            "madecassoside asiaticoside skin",
            "Centella asiatica cosmetic clinical trial",
        ],
    },
    "acido_hialuronico": {
        "common_name": "Ácido hialurónico",
        "scientific_name": "Hyaluronic acid",
        "search_terms": [
            "topical hyaluronic acid skin hydration clinical",
            "hyaluronic acid molecular weight skin penetration",
        ],
    },

    # -- Nativas chilenas que faltaban --
    "quillay": {
        "common_name": "Quillay",
        "scientific_name": "Quillaja saponaria",
        "search_terms": ["Quillaja saponaria saponin", "quillay extracto actividad"],
    },
    "avellano_chileno": {
        "common_name": "Avellano chileno",
        "scientific_name": "Gevuina avellana",
        "search_terms": ["Gevuina avellana oil", "avellano chileno aceite"],
    },
    "murtilla": {
        "common_name": "Murtilla",
        "scientific_name": "Ugni molinae",
        "search_terms": ["Ugni molinae polyphenols", "murtilla antioxidant activity"],
    },
    "calafate": {
        "common_name": "Calafate",
        "scientific_name": "Berberis microphylla",
        "search_terms": ["Berberis microphylla anthocyanin", "calafate antioxidant"],
    },
    "maiten": {
        "common_name": "Maitén",
        "scientific_name": "Maytenus boaria",
        "search_terms": ["Maytenus boaria", "maiten planta medicinal"],
    },
    "ulmo": {
        "common_name": "Ulmo",
        "scientific_name": "Eucryphia cordifolia",
        "search_terms": ["Eucryphia cordifolia", "ulmo honey antibacterial"],
    },
    "nalca": {
        "common_name": "Nalca o pangue",
        "scientific_name": "Gunnera tinctoria",
        "search_terms": ["Gunnera tinctoria", "nalca pangue compuestos"],
    },
    "michay": {
        "common_name": "Michay",
        "scientific_name": "Berberis darwinii",
        "search_terms": ["Berberis darwinii", "michay berberina"],
    },
    "quinchamali": {
        "common_name": "Quinchamalí",
        "scientific_name": "Quinchamalium chilense",
        "search_terms": ["Quinchamalium chilense", "quinchamali planta medicinal"],
    },
})

# Más libros: la búsqueda anterior era solo de plantas y etnobotánica.
PLANTS["libros"]["search_terms"] += [
    "cosmetic science formulation",
    "cosmetic chemistry handbook",
    "manual lymphatic drainage",
    "dermatology skin care textbook",
    "essential oils aromatherapy science",
    "soap making handbook",
]


# ── Registro de fuentes ────────────────────────────────────────────────────────
# Para agregar una fuente: implementa fetch_<nombre> y agrégala aquí.

# ── Fetcher: OpenAlex ─────────────────────────────────────────────────────────
# La base abierta más grande que existe (más de 250 millones de trabajos) y con
# buena cobertura latinoamericana, que es justo lo que SciELO dejó de darnos.

_OPENALEX_SEARCH = "https://api.openalex.org/works"


def _openalex_abstract(inverted: Optional[dict]) -> Optional[str]:
    """OpenAlex guarda el resumen como índice invertido (palabra -> posiciones)."""
    if not inverted:
        return None
    posiciones: list[tuple[int, str]] = []
    for palabra, indices in inverted.items():
        for i in indices:
            posiciones.append((i, palabra))
    posiciones.sort()
    return _clean(" ".join(p for _, p in posiciones))


def fetch_openalex(plant: dict, max_results: int = MAX_RESULTS_PER_SOURCE) -> list[Article]:
    """Busca en OpenAlex."""
    articles: list[Article] = []
    per_term = max(max_results // len(plant["search_terms"]), 5)
    headers = {"User-Agent": "ElFloemaBiblioteca/1.0 (investigacion cosmetica botanica)"}

    for term in plant["search_terms"]:
        try:
            r = requests.get(_OPENALEX_SEARCH, params={
                "search": term,
                "per-page": min(per_term, 50),
            }, headers=headers, timeout=25)
            r.raise_for_status()
            data = r.json()
        except Exception as e:
            log.warning(f"OpenAlex [{term}]: {e}")
            time.sleep(REQUEST_DELAY)
            continue

        for w in data.get("results", []):
            loc = w.get("primary_location") or {}
            fuente = (loc.get("source") or {}).get("display_name")
            oa = w.get("open_access") or {}
            articles.append(Article(
                title=_clean(w.get("display_name")) or "",
                source="OpenAlex",
                authors=[
                    _clean((a.get("author") or {}).get("display_name")) or ""
                    for a in (w.get("authorships") or [])
                ][:15],
                year=w.get("publication_year"),
                abstract=_openalex_abstract(w.get("abstract_inverted_index")),
                doi=_clean((w.get("doi") or "").replace("https://doi.org/", "")) or None,
                pdf_url=_clean(oa.get("oa_url")),
                url=_clean(w.get("id")),
                journal=_clean(fuente),
            ))
        time.sleep(REQUEST_DELAY)

    return [a for a in articles if a.title]


# ── Fetcher: Crossref ─────────────────────────────────────────────────────────
# El registro de DOI. Trae mucho que no está en PubMed, sobre todo revistas de
# cosmética, química aplicada y publicaciones en español.

_CROSSREF_SEARCH = "https://api.crossref.org/works"


def fetch_crossref(plant: dict, max_results: int = MAX_RESULTS_PER_SOURCE) -> list[Article]:
    """Busca en Crossref."""
    articles: list[Article] = []
    per_term = max(max_results // len(plant["search_terms"]), 5)
    headers = {"User-Agent": "ElFloemaBiblioteca/1.0 (investigacion cosmetica botanica)"}

    for term in plant["search_terms"]:
        try:
            r = requests.get(_CROSSREF_SEARCH, params={
                "query.bibliographic": term,
                "rows": min(per_term, 50),
                "select": "title,author,issued,DOI,abstract,container-title,URL",
            }, headers=headers, timeout=25)
            r.raise_for_status()
            items = r.json().get("message", {}).get("items", [])
        except Exception as e:
            log.warning(f"Crossref [{term}]: {e}")
            time.sleep(REQUEST_DELAY)
            continue

        for it in items:
            titulos = it.get("title") or []
            if not titulos:
                continue
            partes = (it.get("issued") or {}).get("date-parts") or [[]]
            anio = partes[0][0] if partes and partes[0] else None
            revista = (it.get("container-title") or [None])[0]
            # El resumen viene en XML de JATS; se le quitan las etiquetas.
            resumen = it.get("abstract")
            if resumen:
                resumen = _clean(re.sub(r"<[^>]+>", " ", resumen))
            articles.append(Article(
                title=_clean(titulos[0]) or "",
                source="Crossref",
                authors=[
                    _clean(f"{a.get('given', '')} {a.get('family', '')}") or ""
                    for a in (it.get("author") or [])
                ][:15],
                year=anio if isinstance(anio, int) else None,
                abstract=resumen,
                doi=_clean(it.get("DOI")),
                url=_clean(it.get("URL")),
                journal=_clean(revista),
            ))
        time.sleep(REQUEST_DELAY)

    return [a for a in articles if a.title]


# ── Fetcher: DOAJ ─────────────────────────────────────────────────────────────
# Solo revistas de acceso abierto: todo lo que aparezca aquí se puede leer
# completo y gratis. Fuerte en español y portugués.

_DOAJ_SEARCH = "https://doaj.org/api/search/articles/"


def fetch_doaj(plant: dict, max_results: int = MAX_RESULTS_PER_SOURCE) -> list[Article]:
    """Busca en DOAJ (revistas de acceso abierto)."""
    from urllib.parse import quote

    articles: list[Article] = []
    per_term = max(max_results // len(plant["search_terms"]), 5)
    # DOAJ responde 403 a agentes que no parecen navegador.
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/140.0 Safari/537.36",
        "Accept": "application/json",
    }

    for term in plant["search_terms"]:
        try:
            r = requests.get(
                _DOAJ_SEARCH + quote(term, safe=""),
                params={"pageSize": min(per_term, 50)},
                headers=headers,
                timeout=25,
            )
            r.raise_for_status()
            resultados = r.json().get("results", [])
        except Exception as e:
            log.warning(f"DOAJ [{term}]: {e}")
            time.sleep(REQUEST_DELAY)
            continue

        for it in resultados:
            b = it.get("bibjson") or {}
            enlaces = b.get("link") or []
            texto_completo = next(
                (l.get("url") for l in enlaces if l.get("type") == "fulltext"), None
            )
            doi = next(
                (i.get("id") for i in (b.get("identifier") or []) if i.get("type") == "doi"),
                None,
            )
            anio = b.get("year")
            try:
                anio = int(anio) if anio else None
            except (TypeError, ValueError):
                anio = None
            articles.append(Article(
                title=_clean(b.get("title")) or "",
                source="DOAJ",
                authors=[_clean(a.get("name")) or "" for a in (b.get("author") or [])][:15],
                year=anio,
                abstract=_clean(b.get("abstract")),
                doi=_clean(doi),
                pdf_url=_clean(texto_completo),
                url=_clean(texto_completo),
                journal=_clean((b.get("journal") or {}).get("title")),
            ))
        time.sleep(REQUEST_DELAY)

    return [a for a in articles if a.title]


# SciELO quedó fuera: desde 2026 search.scielo.org responde 403 detrás de un
# escudo anti-bots, así que raspar la salida RIS ya no funciona. La función
# sigue aquí por si vuelve a abrirse. Su cobertura la reemplazan OpenAlex
# (que indexa SciELO) y DOAJ.
SOURCES = [
    fetch_pubmed,
    fetch_semantic_scholar,
    fetch_europe_pmc,
    fetch_openalex,
    fetch_crossref,
    fetch_doaj,
    fetch_redalyc,
]


# ── Motor principal ────────────────────────────────────────────────────────────

def collect_plant(plant_key: str, plant: dict) -> dict[str, int]:
    """Recopila artículos de todas las fuentes para una planta. Devuelve conteo por fuente."""
    plant_dir = OUTPUT_DIR / plant.get("folder", plant_key)
    plant_dir.mkdir(parents=True, exist_ok=True)

    counts: dict[str, int] = {}
    sources = plant.get("sources_override", SOURCES)

    for fetcher in sources:
        source_name = fetcher.__name__.replace("fetch_", "")
        log.info(f"  [{source_name}] buscando...")

        try:
            articles = fetcher(plant)
        except Exception as e:
            log.error(f"  [{source_name}] fallo inesperado: {e}")
            articles = []

        output_path = plant_dir / f"{source_name}.json"
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump([asdict(a) for a in articles], f, ensure_ascii=False, indent=2)

        counts[source_name] = len(articles)
        log.info(f"  [{source_name}] {len(articles)} artículos → {output_path}")

        time.sleep(REQUEST_DELAY)

    # Índice combinado sin duplicados
    all_articles: list[Article] = []
    for f_path in sorted(plant_dir.glob("*.json")):
        if f_path.name == "todos.json":
            continue
        try:
            with open(f_path, encoding="utf-8") as f:
                all_articles.extend(Article(**a) for a in json.load(f))
        except (json.JSONDecodeError, TypeError) as e:
            log.warning(f"  [índice] {f_path.name} ilegible: {e}")

    unique = _deduplicate(all_articles)
    todos_path = plant_dir / "todos.json"
    with open(todos_path, "w", encoding="utf-8") as f:
        json.dump([asdict(a) for a in unique], f, ensure_ascii=False, indent=2)
    log.info(f"  [índice] {len(unique)} artículos únicos → {todos_path}")
    counts["_total_unico"] = len(unique)

    return counts


def main() -> None:
    parser = argparse.ArgumentParser(description="Recolector de artículos científicos")
    parser.add_argument(
        "--only", nargs="+", metavar="CLAVE",
        help="Procesar solo estas claves (ej: --only matico maqui ayurveda)",
    )
    parser.add_argument(
        "--sources", nargs="+", metavar="FUENTE",
        help="Consultar solo estas fuentes (ej: --sources openalex crossref doaj). "
             "El índice igual se rehace con todo lo que ya esté descargado.",
    )
    args = parser.parse_args()

    if args.sources:
        disponibles = {f.__name__.replace("fetch_", ""): f for f in SOURCES}
        desconocidas = set(args.sources) - set(disponibles)
        if desconocidas:
            log.error(f"Fuentes desconocidas: {desconocidas}. Hay: {list(disponibles)}")
            sys.exit(1)
        globals()["SOURCES"] = [disponibles[n] for n in args.sources]

    keys_to_run = set(args.only) if args.only else set(PLANTS)
    unknown = keys_to_run - set(PLANTS)
    if unknown:
        log.error(f"Claves desconocidas: {unknown}. Disponibles: {list(PLANTS)}")
        sys.exit(1)

    OUTPUT_DIR.mkdir(exist_ok=True)
    global_summary: dict[str, dict] = {}

    for plant_key, plant in PLANTS.items():
        if plant_key not in keys_to_run:
            continue
        log.info(f"\n{'=' * 60}")
        log.info(f"Planta: {plant['common_name']} ({plant['scientific_name']})")
        log.info(f"{'=' * 60}")
        global_summary[plant_key] = collect_plant(plant_key, plant)

    summary_path = OUTPUT_DIR / "resumen.json"
    previo: dict[str, dict] = {}
    if summary_path.exists():
        try:
            with open(summary_path, encoding="utf-8") as f:
                previo = json.load(f)
        except (json.JSONDecodeError, OSError):
            log.warning("resumen.json ilegible; se reescribe desde cero")
    previo.update(global_summary)
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(previo, f, ensure_ascii=False, indent=2)

    log.info(f"\n{'=' * 60}")
    log.info("RESUMEN FINAL")
    log.info(f"{'=' * 60}")
    for plant_key, counts in global_summary.items():
        total = counts.get("_total_unico", "?")
        sources = {k: v for k, v in counts.items() if not k.startswith("_")}
        log.info(f"  {plant_key:<12} {total:>3} únicos  |  {sources}")

    log.info(f"\nResultados guardados en: {OUTPUT_DIR.resolve()}")


if __name__ == "__main__":
    main()
