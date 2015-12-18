

var productNames = ["bag.jpg", "banana.jpg","boots.jpg","chair.jpg","cthulhu.jpg","dragon.jpg","pen.jpg", "scissors.jpg", "shark.jpg", "sweep.jpg", "unicorn.jpg", "usb.jpg", "water_can.jpg","wine_glass.jpg"];
var barData = {
	labels : [],
	datasets : [
		{
      fillColor: "#1F8A70",
      highlightFill: "#FFE11A",
			strokeColor : "#48A4D1",
			data : []
		},
	]
};

var barOptions = {
     barShowStroke: false,
     scaleShowGridLines: false,
     barValueSpacing : 1,
};

var allProducts =[];
var myBarChartEl = document.getElementById("myChart");

function Product (place){
  this.path = "img/"+ productNames[place];
  this.name = productNames[place].slice(0,-4);
  this.tally = 0;
  this.views = 0;
  barData.labels.push(this.name);
};

function createAlbum(){
  for (var i = 0; i < productNames.length; i++) {
    var photo = new Product(i);
    allProducts.push(photo);
  };
};

createAlbum();

var productRank = {
  totalClicks: 0,
  leftObj: null,
  midObj: null,
  rightObj: null,
  barChart: null,

  resultsEl: document.getElementById("results"),
  leftEl: document.getElementById("img1"),
  midEl: document.getElementById("img2"),
  rightEl: document.getElementById("img3"),

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  displayImages: function () {
    productRank.leftObj = allProducts[productRank.getRandomIndex()];
    productRank.midObj = allProducts[productRank.getRandomIndex()];
    productRank.rightObj = allProducts[productRank.getRandomIndex()];

    if(productRank.leftObj === productRank.midObj || productRank.leftObj === productRank.rightObj || productRank.midObj === productRank.rightObj) {
    productRank.displayImages();
    } else{
      productRank.leftObj.views += 1;
      productRank.midObj.views += 1;
      productRank.rightObj.views += 1;
    }
     productRank.leftEl.src = productRank.leftObj.path;
     productRank.leftEl.id = productRank.leftObj.name;
     productRank.midEl.src = productRank.midObj.path;
     productRank.midEl.id = productRank.midObj.name;
     productRank.rightEl.src = productRank.rightObj.path;
     productRank.rightEl.id = productRank.rightObj.name;
  },

  showResults: function(){
    if (productRank.totalClicks % 15 === 0) {
    productRank.resultsEl.hidden = false;
    } else {
    productRank.resultsEl.hidden = true;
      myBarChartEl.hidden = true;
    }
  }
};

function compare(a,b) {
  if (a.tally > b.tally)
    return -1;
  if (a.tally < b.tally)
    return 1;
  return 0;
};

productRank.displayImages();

productRank.leftEl.addEventListener('click', function() {
  productRank.leftObj.tally += 1;
  productRank.totalClicks += 1;
  console.log('Total number of clicks is ' + productRank.totalClicks);
  productRank.showResults();
  productRank.displayImages();
});

productRank.midEl.addEventListener('click', function() {
  productRank.midObj.tally += 1;
  productRank.totalClicks += 1;
  console.log('Total number of clicks is ' + productRank.totalClicks);
  productRank.showResults();
  productRank.displayImages();
});

productRank.rightEl.addEventListener('click', function() {
  productRank.rightObj.tally += 1;
  productRank.totalClicks += 1;
  console.log('Total number of clicks is ' + productRank.totalClicks);
  productRank.showResults();
  productRank.displayImages();
});

var barChart = document.getElementById("myChart").getContext("2d");

function generateChart()  {
  myBarChartEl.hidden = false;
  allProducts.sort(compare);
  for(var i=0; i < allProducts.length; i++){
    barData.datasets[0].data[i] = allProducts[i].tally;
  };
    if(localStorage.tallies){
      var barTallies = JSON.parse(localStorage.tallies);
      for(var i=0; i<allProducts.length; i++){
        barData.datasets[0].data[i] += barTallies[i];
      };
      localStorage.setItem("tallies",  JSON.stringify(barData.datasets[0].data));
    }else{
      localStorage.setItem("tallies", JSON.stringify(barData.datasets[0].data));
  }
  new Chart(barChart).Bar(barData, barOptions);
}

productRank.resultsEl.addEventListener('click', function(event) {
  event.preventDefault();
  generateChart();
});
