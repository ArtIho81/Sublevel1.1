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
  };
  this.getName = function () {
    return this.name;
  };
  this.setName = function (name) {
    this.name = name;
  };
  this.getDescription = function () {
    return this.description;
  };
  this.setDescription = function (description) {
    this.description = description;
  };
  this.getPrice = function () {
    return this.price;
  };
  this.setPrice = function (price) {
    this.price = price;
  };
  this.getBrand = function () {
    return this.brand;
  };
  this.setBrand = function (brand) {
    this.brand = brand;
  };
  this.getSizes = function () {
    return this.sizes;
  };
  this.setSizes = function (sizes) {
    this.sizes = sizes;
  };
  this.getActiveSize = function () {
    return this.activeSize;
  };
  this.setActiveSize = function (activeSize) {
    this.activeSize = activeSize;
  };
  this.getQuantity = function () {
    return this.quantity;
  };
  this.setQuantity = function (quantity) {
    this.quantity = quantity;
  };
  this.getDate = function () {
    return this.date;
  };
  this.setDate = function () {
    this.date = new Date();
  };
  this.getReviews = function () {
    return this.reviews;
  };
  this.setReviews = function (reviews) {
    this.reviews = reviews;
  };
  this.getImages = function () {
    return this.images;
  };
  this.setImages = function (images) {
    this.images = images;
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
  };
  this.deleteSize = function (size) {
    this.sizes = this.sizes.filter((s) => s !== size);
  };
  this.addReview = function (review) {
    this.reviews.push(review);
  };
  this.deleteReview = function (ID) {
    this.reviews = this.reviews.filter((review) => review.ID !== ID);
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
    let rating = 0;
    if (this.reviews.length === 0) {
      return rating;
    }
    this.reviews.forEach((review) => {
      rating += sumObjectProperties(review.rating);
    });
    return rating / this.reviews.length;
  };
  /**
   * Returns the product rating from one review.
   * @param {Object} object - an object containing the values of the product rating properties.
   * @returns The product rating from one review.
   */
  sumObjectProperties = function (object) {
    let sum = { sum: 0, properties: 0 };
    for (let property in object) {
      if (
        object.hasOwnProperty(property) &&
        typeof object[property] === "number"
      ) {
        sum.sum += object[property];
        sum.properties++;
      }
    }
    if (sum.properties === 0) {
      return sum.sum;
    }
    return sum.sum / sum.properties;
  };
}).call(Product.prototype);

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
  const searchProducts = [];
  products.forEach((product) => {
    if (isMatch(product.name, search) || isMatch(product.description, search)) {
      searchProducts.push(product);
    }
  });
  return searchProducts;
}

/**
 * Checks for a match search text in text.
 * @param {string} text - the text in which the match is searched.
 * @param {string} search - the desired match.
 * @returns True if text contains search.
 */
function isMatch(property, search) {
  search = new RegExp(`${search}`, "i");
  return search.test(property);
}

/**
 * Implements sorting products by its ID or price or name.
 * @param {Array} products - array of Product objects.
 * @param {string} sortRule - sorting property.
 * @returns Sorting array of products by sortRule.
 */
function sort(products, sortRule) {
  const sortProducts = Object.assign({}, products);
  switch (sortRule) {
    case "iDUp":
      return sortProducts.sort((a, b) => a.id.localeCompare(b.id));
    case "iDDown":
      return sortProducts.sort((a, b) => b.id.localeCompare(a.id));
    case "priceUp":
      return sortProducts.sort((a, b) => a.price - b.price);
    case "priceDown":
      return sortProducts.sort((a, b) => b.price - a.price);
    case "nameUp":
      return sortProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "nameDown":
      return sortProducts.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return products;
  }
}