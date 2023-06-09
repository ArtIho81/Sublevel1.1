"use strict";

/**
 * Constructor for Product object.
 * @param {string} ID - The product key (unique value).
 * @param {string} name - The product's name.
 * @param {string} brand - The product's brand.
 * @param {number} price - The product's price.
 * @param {string} activeSize - The product's active size.
 * @param {number} quantity - Number of products in stock.
 */

function Product(ID, name, brand, price, activeSize, quantity) {
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
/* Methods Product object */
(function () {
  this.getID = function () {
    return this.ID;
  };
  this.setID = function (ID) {
    this.ID = ID;
    return this;
  };
  this.getName = function () {
    return this.name;
  };
  this.setName = function (name) {
    this.name = name;
    return this;
  };
  this.getDescription = function () {
    return this.description;
  };
  this.setDescription = function (description) {
    this.description = description;
    return this;
  };
  this.getPrice = function () {
    return this.price;
  };
  this.setPrice = function (price) {
    this.price = price;
    return this;
  };
  this.getBrand = function () {
    return this.brand;
  };
  this.setBrand = function (brand) {
    this.brand = brand;
    return this;
  };
  this.getSizes = function () {
    return this.sizes;
  };
  this.setSizes = function (sizes) {
    this.sizes = sizes;
    return this;
  };
  this.getActiveSize = function () {
    return this.activeSize;
  };
  this.setActiveSize = function (activeSize) {
    this.activeSize = activeSize;
    return this;
  };
  this.getQuantity = function () {
    return this.quantity;
  };
  this.setQuantity = function (quantity) {
    this.quantity = quantity;
    return this;
  };
  this.getDate = function () {
    return this.date;
  };
  this.setDate = function () {
    this.date = new Date();
    return this;
  };
  this.getReviews = function () {
    return this.reviews;
  };
  this.setReviews = function (reviews) {
    this.reviews = reviews;
    return this;
  };
  this.getImages = function () {
    return this.images;
  };
  this.setImages = function (images) {
    this.images = images;
    return this;
  };

  /**
   * Returns the image by the passed parameter, if the parameter was not passed
   * then the first image from the array
   * @param {number or string} image - The image index in the array or the image name.
   */
  this.getImage = function (image) {
    switch (typeof image) {
      case "number":
        return this.images[image];
      case "string":
        return this.images.find((img) => img === image);
      default:
        return this.images[0];
    }
  };
  this.addSize = function (size) {
    this.sizes.push(size);
    return this;
  };
  this.deleteSize = function (size) {
    this.sizes = this.sizes.filter((s) => s !== size);
    return this;
  };
  this.addReview = function (review) {
    this.reviews.push(review);
    return this;
  };
  this.deleteReview = function (ID) {
    this.reviews = this.reviews.filter((review) => review.ID !== ID);
    return this;
  };
  this.getReviewByID = function (ID) {
    return this.reviews.find((review) => review.ID === ID);
  };

  /**
   * Returns the average rating of a product based on reviews rating or
   * 0 if product has no one review.
   * @returns The average rating of a product based on reviews rating.
   */
  this.getAverageRating = function () {
    const rating = this.reviews.reduce(
      (acc, review) => acc += sumObjectProperties(review.rating), 0);
    const isReviewsEmpty = this.reviews.length === 0;
    return isReviewsEmpty ? 0 : rating / this.reviews.length;
  };
  /**
   * Returns the product rating from one review.
   * @param {Object} object - an object containing the values of the product rating properties.
   * @returns The product rating from one review.
   */
  function sumObjectProperties(object) {
    let sum = { sum: 0, properties: 0 };
    const isValidProperty = (property) =>
      object.hasOwnProperty(property) && typeof object[property] === "number";

    for (let property in object) {
      if (isValidProperty(property)) {
        sum.sum += object[property];
        sum.properties++;
      }
    }
    const isPropertiesEnable = sum.properties !== 0;
    return isPropertiesEnable ? sum.sum / sum.properties : 0;
  }
}).call(Product.prototype);

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
function Review(ID, author, comment, service, price, value, quality) {
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

/**
 * Implements the search for products by matching the search query
 * in the product name or description
 * @param {Array} products - array of Product objects.
 * @param {string} search - the desired match.
 * @returns An array with searching products.
 */
function search(products, search) {
  const isMatch = (property) => new RegExp(`\\b${search}`, "i").test(property);
  return products.filter(
    (product) => isMatch(product.name) || isMatch(product.description)
  );
}

/**
 * Implements sorting products by its ID or price or name.
 * @param {Array} products - array of Product objects.
 * @param {string} sortRule - sorting property.
 * @returns Sorting array of products by sortRule.
 */
function sort(products, sortRule) {
  const sortProducts = products.slice();
  switch (sortRule.toLowerCase()) {
    case "idup":
      return sortProducts.sort((a, b) => a.ID.localeCompare(b.ID));
    case "iddown":
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

const product1 = new Product("p1", "T-shirt", "Adidas", 12, "M", 5);
const product2 = new Product("p2", "Tshirt", "Puma", 11, "XL", 8);
const product3 = new Product("p3", "Skirt", "Cos", 15, "M", 3);
const product4 = new Product("p4", "Shorts", "Nike", 14, "XS", 1);
const product5 = new Product("p5", "Pants", "Reebok", 25, "L", 2);

const review1 = new Review("r1", "Max", "Super", 5, 5, 5, 5);
const review2 = new Review("r2", "Alex", "Good", 4, 4, 5, 4);
const review3 = new Review("r3", "Serg", "Norm", 3, 3, 3, 3);
const review4 = new Review("r4", "Max", "OK", 5, 4, 5, 5);
const review5 = new Review("r5", "Andrew", "Bad", 2, 2, 2, 2);

const reviews = [];
reviews.push(review1);
reviews.push(review2);
reviews.push(review3);
reviews.push(review4);
reviews.push(review5);

product1
  .setReviews(reviews)
  .setActiveSize("XS")
  .setID("7899")
  .setName("qwerty");
product2.setReviews(reviews);
product3.setReviews(reviews);
product4.setReviews(reviews);
product5.setReviews(reviews);

const products = [product1, product2, product3, product4, product5];
console.log(product1.getAverageRating());
// const sortRules = [
//   "idup",
//   "iddown",
//   "priceup",
//   "Pricedown",
//   "NamEuP",
//   "nAmedoWn",
// ];
console.log(product1);
// for (let sortRule of sortRules) {
//   let sortProducts = sort(products, sortRule);
//   console.log(sortRule);
//   sortProducts.forEach((product) => {
//     switch (sortRule) {
//       case "idup":
//         console.log(product.ID);
//         break;
//       case "iddown":
//         console.log(product.ID);
//         break;
//       case "priceup":
//         console.log(product.price);
//         break;
//       case "Pricedown":
//         console.log(product.price);
//         break;
//       case "NamEuP":
//         console.log(product.name);
//         break;
//       case "nAmedoWn":
//         console.log(product.name);
//     }
//   });
// }
