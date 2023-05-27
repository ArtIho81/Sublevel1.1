'use strict'

/**
 * Creates object Product which contains next properties: ID, name, brand, description, price, date of creation,
 * sizes, quantity, active size, reviews and images. Reviews is the array of objects Review. Images is the array
 * of the images names.
 */
class Product {
  /**
   * Constructor for Product object.
   * @param {string} ID - The product key (unique value).
   * @param {string} name - The product's name.
   * @param {string} brand - The product's brand.
   * @param {number} price - The product's price.
   * @param {string} activeSize - The product's active size.
   * @param {number} quantity - Number of products in stock.
   */
  constructor(ID, name, brand, price, activeSize, quantity) {
    this.ID = ID;
    this.name = name;
    this.description = "no description";
    this.price = price;
    this.brand = brand;
    this.sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = new Date();
    this.reviews = [];
    this.images = ["img1", "img2", "img3"];
  }

  getID() {
    return this.ID;
  }
  setID(ID) {
    this.ID = ID;
    return this;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
    return this;
  }
  getDescription() {
    return this.description;
  }
  setDescription(description) {
    this.description = description;
    return this;
  }
  getPrice() {
    return this.price;
  }
  setPrice(price) {
    this.price = price;
    return this;
  }
  getBrand() {
    return this.brand;
  }
  setbrand(brand) {
    this.brand = brand;
    return this;
  }
  getSizes() {
    return this.sizes;
  }
  setSizes(sizes) {
    this.sizes = sizes;
    return this;
  }
  getActiveSize() {
    return this.activeSize;
  }
  setActiveSize(activeSize) {
    this.activeSize = activeSize;
    return this;
  }
  getQuantity() {
    return this.quantity;
  }
  setQuantity(quantity) {
    this.quantity = quantity;
    return this;
  }
  getDate() {
    return this.date;
  }
  setDate() {
    this.date = new Date();
    return this;
  }
  getReviews() {
    return this.reviews;
  }
  setReviews(reviews) {
    this.reviews = reviews;
    return this;
  }
  getImages() {
    return this.images;
  }
  setImages(images) {
    this.images = images;
    return this;
  }
  getImage(image) {
    switch (typeof image) {
      case "number":
        return this.images[image];
      case "string":
        return this.images.find((img) => img === image);
      default:
        return this.images[0];
    }
  }
  addSize(size) {
    this.sizes.push(size);
    return this;
  }
  deleteSize(size) {
    this.sizes = this.sizes.filter((s) => s !== size);
    return this;
  }
  addReview(review) {
    this.reviews.push(review);
    return this;
  }
  deleteReview(ID) {
    this.reviews = this.reviews.filter((review) => review.ID !== ID);
    return this;
  }
  getReviewByID(ID) {
    return this.reviews.find((review) => review.ID === ID);
  }

  /**
   * Returns the average rating of a product based on reviews rating or 0 if product has no one review.
   * @returns The average rating of a product based on reviews rating.
   */
  getAverageRating() {
    const rating = this.reviews.reduce((acc, review) => acc + this.#getProductRating(review.rating), 0);
    const isReviewsEmpty = this.reviews.length === 0;
    return isReviewsEmpty ? 0 : rating / this.reviews.length;
  }

  /**
   * Returns the product rating from one review.
   * @param {Object} rating - an object containing the values of the product rating properties.
   * @returns The product rating from one review.
   */
  #getProductRating(rating) {
    const sum = { sum: 0, properties: 0 };
    const isValidProperty = (property) => {
      rating.hasOwnProperty(property) && typeof rating[property] === "number";
    }
    for (let property in rating) {
      if (isValidProperty(property)) {
        sum.sum += rating[property];
        sum.properties++;
      }
    }
    const isPropertiesEnable = sum.properties !== 0;
    return isPropertiesEnable ? sum.sum / sum.properties : 0;
  }
}

/**
 * Creates object Review which contains next properties: ID, author, comment, date of creation
 * and rating. Rating is the object with next properties: service, price, value, quality.
 */
class Review {
  /**
   * Constructor for Review object.
   * @param {string} ID - the review key (unique value).
   * @param {string} author - the review author name.
   * @param {string} comment - the comment for the product.
   * @param {number} service - the product service rating.
   * @param {number} price - the product price rating.
   * @param {number} value - the product value rating.
   * @param {number} quality - the product quality rating.
   */
  constructor(ID, author, comment, service, price, value, quality) {
    this.ID = ID;
    this.author = author;
    this.date = new Date();
    this.comment = comment;
    this.rating = {
      service: service,
      price: price,
      value: value,
      quality: quality,
    };
  }
}

/**
 * Implements the search for products by matching the search query in the product name or description
 * @param {Array} products - array of Product objects.
 * @param {string} search - the desired match.
 * @returns An array with searching products.
 */
function search(products, search) {
  const isMatch = (property) => new RegExp(`\\b${search}`, "i").test(property);
  return products.filter((product) => isMatch(product.name) || isMatch(product.description));
  };

  /**
 * Implements sorting products by its ID or price or name.
 * @param {Array} products - array of Product objects.
 * @param {string} sortRule - sorting property.
 * @returns Sorting array of products by sortRule.
 */
function sort(products, sortRule) {
  const sortProducts = products.slice();
  switch (sortRule.toLowercase()) {
    case "idup":
      return sortProducts.sort((a, b) => a.ID.localeCompare(b.ID));
    case "Iddown":
      return sortProducts.sort((a, b) => b.ID.localeCompare(a.ID));
    case "priceup":
      return sortProducts.sort((a, b) => a.price - b.price);
    case "pricedown":
      return sortProducts.sort((a, b) => b.price - a.price);
    case "nameup":
      return sortProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "namedown":
      return sortProducts.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return products;
  }
}