"""Casos fictícios de dimensionamento de eixos. Os dados ainda não vêm de um banco."""

SHAFT_TABLE = {
    "columns": [
        {"key": "eixo", "label": "Eixo"},
        {"key": "material", "label": "Material"},
        {"key": "torque", "label": "Torque (N·m)"},
        {"key": "momento", "label": "Momento (N·m)"},
        {"key": "diametro", "label": "Diâmetro (mm)"},
        {"key": "situacao", "label": "Situação"},
    ],
    "rows": [
        {
            "eixo": "E-01",
            "material": "SAE 1045",
            "torque": 180,
            "momento": 95,
            "diametro": 32,
            "situacao": "Adequado",
        },
        {
            "eixo": "E-02",
            "material": "SAE 4140",
            "torque": 420,
            "momento": 210,
            "diametro": 45,
            "situacao": "Adequado",
        },
        {
            "eixo": "E-03",
            "material": "SAE 1020",
            "torque": 90,
            "momento": 140,
            "diametro": 25,
            "situacao": "Revisar",
        },
        {
            "eixo": "E-04",
            "material": "AISI 4340",
            "torque": 760,
            "momento": 380,
            "diametro": 60,
            "situacao": "Adequado",
        },
        {
            "eixo": "E-05",
            "material": "SAE 1045",
            "torque": 250,
            "momento": 310,
            "diametro": 28,
            "situacao": "Revisar",
        },
    ],
}
