class Pokemon {
  constructor(name, image, type) {
    this.name = name
    this.image = image
    this.type = type
  }

  getInfo() {
    return {
      name: this.name,
      image: this.image,
      type: this.type,
    }
  }

  isValid() {
    return this.name && this.image && this.type
  }
}

export default Pokemon