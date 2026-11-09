"""Registro das rotas da API."""


def register_routes(app):
    from routes.calculos import calculos_bp

    app.register_blueprint(calculos_bp)
