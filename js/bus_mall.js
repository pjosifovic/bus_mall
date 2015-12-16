// declaring general VAR
var allProducts = [];
var productNames = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can', 'wine_glass'];
// var allViewed = [];

//// creating Product obj constuctor
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.tally = 0;
  this.views = 0;
  allProducts.push(this);
};

// create 14 images with name and path properties using function buildAlbum
(function buildAlbum() {
  for (var i = 0; i < productNames.length; i++) {
    new Product(productNames[i], 'img/' + productNames[i] + '.jpg');
  };
})();


var sectEl = document.getElementById('imageList');

function addingList() {
    // console.log('in adding function');
    var ulEl = document.createElement('ul');
    ulEl.textContent = 'User voted like this'

    // liEl = document.createElement('li');

    for (var i = 0; i < productNames.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = productNames[i] + ' has ' + allProducts[i].tally;
      ulEl.appendChild(liEl);
      sectEl.appendChild(ulEl);
    };
}

var productRank = {
  leftObj: null,
  midObj: null,
  rightObj: null,
  totalClicks: 0,

  leftEl: document.getElementById('img1'),
  midEl: document.getElementById('img2'),
  rightEl: document.getElementById('img3'),
  resultsEl: document.getElementById('results'),

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
    productRank.leftEl.id = productRank.leftObj.path;

    productRank.midEl.src = productRank.midObj.path;
    productRank.midEl.id = productRank.midObj.name;

    productRank.rightEl.src = productRank.rightObj.path;
    productRank.rightEl.id = productRank.rightObj.name;

  },

  showResults: function() {
    if (productRank.totalClicks % 15 === 0) {
      // addingList();
      productRank.resultsEl.hidden = false;
      sectEl.hidden = false;
    } else {
      productRank.resultsEl.hidden = true;
      sectEl.hidden = true;
    };

    }
};

productRank.resultsEl.addEventListener('click', function() {
  addingList();
  productRank.showResults();
});



productRank.leftEl.addEventListener('click', function() {
  productRank.leftObj.tally += 1;
  productRank.totalClicks += 1;
  productRank.leftObj.view += 1;
  console.log(productRank.leftObj.name + ' has ' + productRank.leftObj.tally);
  productRank.showResults();
  productRank.displayImages();
});

productRank.midEl.addEventListener('click', function() {
  productRank.midObj.tally += 1;
  productRank.totalClicks += 1;
  productRank.midObj.view += 1;
  console.log(productRank.midObj.name + ' has ' + productRank.midObj.tally);
  productRank.showResults();
  productRank.displayImages();
});
//
productRank.rightEl.addEventListener('click', function() {
  productRank.rightObj.tally += 1;
  productRank.totalClicks += 1;
  productRank.rightObj.view += 1;
  console.log(productRank.rightObj.name + ' has ' + productRank.rightObj.tally);
  productRank.showResults();
  productRank.displayImages();
});


productRank.displayImages();
