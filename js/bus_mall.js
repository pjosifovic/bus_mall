
var imageSectionEl = document.getElementById('imageDisplay');
var totalEl = document.getElementById('totals');

var allProducts = [];
var productNames = [
    'bag',
    'banana',
    'boots',
    'chair',
    'cthulhu',
    'dragon',
    'pen',
    'scissors',
    'shark',
    'sweep',
    'unicorn',
    'usb',
    'water_can',
    'wine_glass'
];

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.tally = 0;
  allProducts.push(this);
};

(function buildAlbum() {
  for (var i = 0; i < productNames.length; i++) {
    new Product(productNames[i], 'img/' + productNames[i] + '.jpg');
  };
})();

function generateNewTable() {
  while (totalEl.firstChild) {
    totalEl.removeChild(totalEl.firstChild);
  };
};

var productRank = {
  leftObj: null,
  midObj: null,
  rightObj: null,
  totalClicks: 0,

  leftEl: document.getElementById('img1'),
  midEl: document.getElementById('img2'),
  rightEl: document.getElementById('img3'),
  resultsEl: document.getElementById('results'),
  imageDisplayEl: document.getElementById('imageDisplay'),

  getRandomIndex: function() {
    return Math.floor(Math.random() * productNames.length);
  },


  displayImages: function() {
    productRank.leftObj = allProducts[productRank.getRandomIndex()];
    productRank.midObj = allProducts[productRank.getRandomIndex()];
    productRank.rightObj = allProducts[productRank.getRandomIndex()];

    if (productRank.leftObj === productRank.midObj || productRank.leftObj === productRank.rightObj || productRank.midObj === productRank.rightObj) {
      productRank.displayImages();
    };

    productRank.leftEl.src = productRank.leftObj.path;
    productRank.midEl.src = productRank.midObj.path;
    productRank.rightEl.src = productRank.rightObj.path;
  },

  showResults: function() {
    if (productRank.totalClicks % 15 === 0) {
      productRank.resultsEl.disabled = false;
    } else {
      productRank.resultsEl.disabled = true;
      };
  }
};

function compare(a,b) {
  if (a.tally > b.tally)
    return -1;
  if (a.tally < b.tally)
    return 1;
  return 0;
};

productRank.resultsEl.addEventListener("click", function(event){
  generateNewTable();
  allProducts.sort(compare);
  var headerEl = ["Product", "Tally"];
  var tblEl = document.createElement("table");
  for (var i = 0; i < headerEl.length; i++){
    var thEl = document.createElement("th");
    thEl.textContent = headerEl[i];
    tblEl.appendChild(thEl);
  }
  for (var i = 0; i < allProducts.length; i++){
    trEl = document.createElement("tr");
    var valuesEl = [];
    valuesEl.push(productNames[i], allProducts[i].tally + " Votes");
    for (var j = 0; j < valuesEl.length; j++){
      tdEl = document.createElement("td");
      tdEl.textContent = valuesEl[j];
      trEl.appendChild(tdEl);
      tblEl.appendChild(trEl);
    }
  }
  totalEl.appendChild(tblEl);
});

productRank.leftEl.addEventListener('click', function() {
  productRank.leftObj.tally += 1;
  productRank.totalClicks += 1;
  console.log('TOTAL number of clicks is ' + productRank.totalClicks);
  productRank.showResults();
  productRank.displayImages();
});

productRank.midEl.addEventListener('click', function() {
  productRank.midObj.tally += 1;
  productRank.totalClicks += 1;
  console.log('TOTAL number of clicks is ' + productRank.totalClicks);
  productRank.showResults();
  productRank.displayImages();
});

productRank.rightEl.addEventListener('click', function() {
  productRank.rightObj.tally += 1;
  productRank.totalClicks += 1;
  console.log('TOTAL number of clicks is ' + productRank.totalClicks);
  productRank.showResults();
  productRank.displayImages();

});

productRank.imageDisplayEl.addEventListener('click', function() {
  generateNewTable();
});

productRank.displayImages();
