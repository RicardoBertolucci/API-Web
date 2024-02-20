class ErrorBase extends Error {
  constructor(mensagem = "Internal server error", status = 500) {
    super();
    this.message = mensagem;
    this.status = status;
  }

  sendAnswer(res) {
    res.status(this.status).send({
      mensagem: this.message,
      status: this.status,
    });
  }
}

module.exports = ErrorBase;