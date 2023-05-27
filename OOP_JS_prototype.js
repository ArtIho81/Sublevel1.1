"use strict";
/**
 * Constructor for AbstractProduct object is a prototype for specific products.
 * Objects of this class are not created.
 * @param {string} ID - The product key (unique value).
 * @param {string} name - The product's name.
 * @param {string} brand - The product's brand.
 * @param {number} price - The product's price.
 * @param {number} quantity - Number of products in stock.
 */

function AbstractProduct(ID, name, brand, price, quantity) {
  if (this.constructor === AbstractProduct) {
    throw new Error("Cannot instantiate abstract class");
  }
  this.ID = ID;
  this.name = name;
  this.description = "no description";
  this.price = price;
  this.brand = brand;
  this.quantity = quantity;
  this.date = new Date();
  this.reviews = [];
  this.images = ["img1", "img2", "img3"];
}
/* Methods AbstractProduct object */
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
    const getReviewRating = (object) => {
      const values = Object.values(object);
      const isPropertiesEnable = values.length !== 0;
      return isPropertiesEnable
        ? values.reduce((acc, value) => (acc += value), 0) / values.length
        : 0;
    };
    this.reviews.reduce(
      (acc, review) => (acc += getReviewRating(review.rating)),
      0
    );
    const isReviewsEmpty = this.reviews.length === 0;
    return isReviewsEmpty ? 0 : rating / this.reviews.length;
  };

  this.getPriceForQuantity = function (int) {
    return `$${this.price * int}`;
  };

  this.getSetProperty = function (property, value) {
    const set = () => {
      this[property] = value;
      return this;
    };
    const isGetter = value === undefined;
    return isGetter ? this[property] : set();
  };

  this.getFullInformation = function () {
    let info = "";
    for (let property in this) {
      if (this.hasOwnProperty(property)) {
        if (property === "reviews") {
          info += `${property}:\n${getObjectInfo(this[property])}`;
        } else {
          info += `${property} - ${this[property]} \n`;
        }
      }
    }
    return info;
  };

  function getObjectInfo(object) {
    let info = "";
    for (let property in object) {
      if (typeof object[property] === "object" && property !== "date") {
        info += ` ${property}:\n${getObjectInfo(object[property])} \n`;
      } else {
        info += ` ${property} - ${object[property]} \n`;
      }
    }
    return info;
  }
}).call(AbstractProduct.prototype);

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

function Clothes(
  ID,
  name,
  brand,
  price,
  quantity,
  activeSize,
  material,
  color
) {
  AbstractProduct.call(this, ID, name, brand, price, quantity);

  this.sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  this.activeSize = activeSize;
  this.material = material;
  this.color = color;
}
Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

/* Adds specific methods for Clothes object */
Object.assign(Clothes.prototype, {
  getSizes() {
    return this.sizes;
  },
  setSizes(sizes) {
    this.sizes = sizes;
    return this;
  },
  getActiveSize() {
    return this.activeSize;
  },
  setActiveSize(activeSize) {
    this.activeSize = activeSize;
    return this;
  },
  addSize(size) {
    this.sizes.push(size);
    return this;
  },
  deleteSize(size) {
    this.sizes = this.sizes.filter((s) => s !== size);
    return this;
  },
  getMaterial() {
    return this.material;
  },
  setMaterial(material) {
    this.material = material;
    return this;
  },
  getColor() {
    return this.getColor;
  },
  setColor(color) {
    this.color = color;
    return this;
  },
});

function Electronics(ID, name, brand, price, quantity, warranty, power) {
  AbstractProduct.call(this, ID, name, brand, price, quantity);
  this.warranty = warranty;
  this.power = power;
}
Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;

Electronics.prototype.getWarranty = function () {
  return this.warranty;
};
Electronics.prototype.setWarranty = function (warranty) {
  this.warranty = warranty;
  return this;
};
Electronics.prototype.getPower = function () {
  return this.power;
};
Electronics.prototype.setPower = function (power) {
  this.power = power;
  return this;
};

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
 * @param {Object} sortRule - contains sorting property and sorting rule.
 * For example: sortRule = {sort: "ID", rule: "up"}
 * @returns Sorting array of products by sortRule.
 */
function sort(products, sortRule) {
  const isUpsorting = sortRule.rule === "up";
  if (sortRule.sort === "price") {
    return isUpsorting
      ? [...products].sort((a, b) => a[sortRule.sort] - b[sortRule.sort])
      : [...products].sort((a, b) => b[sortRule.sort] - a[sortRule.sort]);
  }
  if (sortRule.sort === "ID" || sortRule.sort === "name") {
    return isUpsorting
      ? [...products].sort((a, b) =>
          a[sortRule.sort].localeCompare(b[sortRule.sort])
        )
      : [...products].sort((a, b) =>
          b[sortRule.sort].localeCompare(a[sortRule.sort])
        );
  }
  return products;
}

const productC1 = new Clothes("c1", "T-shirt", "Adidas", 12, "M", 5);
const productC2 = new Clothes("c2", "Tshirt", "Puma", 11, "XL", 8);
const productC3 = new Clothes("c3", "Skirt", "Cos", 15, "M", 3);
const productC4 = new Clothes("c4", "Shorts", "Nike", 14, "XS", 1);
const productC5 = new Clothes("c5", "Pants", "Reebok", 25, "L", 2);

const productE1 = new Electronics("e1", "Tv", "Sony", 200, 5, 36, 50);
const productE2 = new Electronics("e2", "Phone", "i-phone", 1000, 11, 12, 15);
const productE3 = new Electronics("e3", "Audio", "Bose", 70, 1, 24, 3);
const productE4 = new Electronics("e4", "Laptop", "HP", 1200, 14, 24, 65);
const productE5 = new Electronics("e5", "Printer", "Canon", 100, 25, 6, 15);

const review1 = new Review("r1", "Max", "Super", 5, 5, 5, 5);
const review2 = new Review("r2", "Alex", "Good", 4, 4, 4, 4);
const review3 = new Review("r3", "Serg", "Norm", 3, 3, 3, 3);
const review4 = new Review("r4", "Max", "OK", 5, 4, 4, 5);
const review5 = new Review("r5", "Andrew", "Bad", 2, 2, 2, 2);

const reviews = [];
reviews.push(review1);
reviews.push(review2);
reviews.push(review3);
reviews.push(review4);
reviews.push(review5);

productC1.setReviews(reviews);
productC2.setReviews(reviews);
productC3.setReviews(reviews);
productC4.setReviews(reviews);
productC5.setReviews(reviews);

const productsC = [productC3, productC5, productC2, productC4, productC1];
const productsE = [productE4, productE1, productE5, productE3, productE2];
const products = productsC.concat(productsE);
const sortRules = [
  { sort: "ID", rule: "up" },
  { sort: "ID", rule: "down" },
  { sort: "price", rule: "up" },
  { sort: "price", rule: "down" },
  { sort: "name", rule: "up" },
  { sort: "name", rule: "down" },
];
//console.log(productC1.getFullInformation());
//console.log(productC1.getSetProperty("ID", "56").getSetProperty("ID"));
console.log(sort(products, sortRules[2]));
console.log("==================================");
console.log(products);
