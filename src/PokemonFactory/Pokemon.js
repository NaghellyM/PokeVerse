class Pokemon {
  constructor(id, name, image, type) {
    this.id = id
    this.name = name
    this.image = image
    this.type = type
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      type: this.type,
    }
  }

  isValid() {
    return this.id && this.name && this.image && this.type
  }
}

export default Pokemon