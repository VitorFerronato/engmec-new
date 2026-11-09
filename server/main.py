"""API do EngMec. Não conhece nem entrega os arquivos do frontend."""

from flask import Flask, request

from routes import register_routes

HOST = "127.0.0.1"
PORT = 8000


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    register_routes(app)
    register_cors(app)
    return app


def register_cors(app):
    @app.before_request
    def answer_preflight():
        if request.method == "OPTIONS":
            return ("", 204)

    @app.after_request
    def allow_browser_clients(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        return response


def main():
    app = create_app()
    print("API EngMec em http://%s:%s" % (HOST, PORT), flush=True)
    app.run(host=HOST, port=PORT, debug=False, use_reloader=False)


if __name__ == "__main__":
    main()
