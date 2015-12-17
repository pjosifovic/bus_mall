var clearEl = document.getElementById('clear');
var totalEl = document.getElementById('totals');
var barEl = document.getElementById("myChart").getContext('2d');
var myBarChart;
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

var barData = {
    labels: [],
    datasets: [
        {
            label: "My First Chart",
            fillColor: "#1F8A70",
            highlightFill: "#FFE11A",
            data: []
        }]
};

var barOptions = {
     barShowStroke: false,
     scaleShowGridLines: false,
     barValueSpacing : 1,
};

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.tally = 0;
  allProducts.push(this);
  barData.labels.push(name);
};


(function buildAlbum() {
  for (var i = 0; i < productNames.length; i++) {
    new Product(productNames[i], 'img/' + productNames[i] + '.jpg');
  };
})();


function generateBarData() {
  if (productRank.totalClicks % 15 === 0) {
  for (var i = 0; i < allProducts.length; i++){
  barData.datasets[0].data.push(allProducts[i].tally);
  };
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
  clearEl: document.getElementById('clear'),
  imageDisplayEl: document.getElementById('imageDisplay'),

  // myBarChartEl: document.getElementById('chartSection'),

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
      productRank.resultsEl.className = "yellow";
    } else {
      productRank.resultsEl.disabled = true;
      productRank.resultsEl.className = "";
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
  barData.datasets[0].data = [];
  allProducts.sort(compare);
  generateBarData();
  myBarChart = new Chart(barEl).Bar(barData, barOptions);
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
    if (myBarChart !== undefined)
    myBarChart.destroy();
});

productRank.displayImages();
