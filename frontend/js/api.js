const EngMecApi = {
  origin: 'http://127.0.0.1:8000',

  url(path) {
    return `${this.origin}${path}`
  },
}
