"""Rotas da API de Cálculos."""

import math

from flask import Blueprint, jsonify, request

from mock_data import SHAFT_TABLE

calculos_bp = Blueprint("calculos", __name__)


@calculos_bp.get("/api/calculos/dimensionamento-de-eixos")
def shaft_table():
    return jsonify(SHAFT_TABLE)


@calculos_bp.post("/api/calculos/soma")
def sum_numbers():
    try:
        payload = request.get_json(silent=True)
        first = require_number(payload, "a")
        second = require_number(payload, "b")
    except ValueError as error:
        return jsonify({"erro": str(error)}), 400

    return jsonify({"a": first, "b": second, "soma": first + second})


def require_number(payload, key):
    if not isinstance(payload, dict) or key not in payload:
        raise ValueError("Informe os dois números.")
    value = payload[key]
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError("Os valores precisam ser numéricos.")
    if not math.isfinite(value):
        raise ValueError("Os valores precisam ser números finitos.")
    return value
