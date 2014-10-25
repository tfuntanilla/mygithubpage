/**
 * @author Trisha Marie Funtanilla
 */

//set the margins
var margin = {
    top : 50,
    right : 160,
    bottom : 80,
    left : 50
}, width = 1200 - margin.left - margin.right, height = 700 - margin.top - margin.bottom;

//set dek and head to be as wide as SVG
d3.select('#dek').style('width', width + 'px');
d3.select('#headline').style('width', width + 'px');

// set the type of number here, n is a number with a comma, .2% will get you a percent, .2f will get you 2 decimal points
var NumbType = d3.format(".2f");

// color array
var colorsarray = ['#f0649e', '#50863d', '#a86b79', '#0b7bc0', '#60bb46', '#825da8', '#51929F', '#d6a477', '#f26524', '#f79420', '#c33f97', '#754d25', '#d52d27', '#c34843', '#808285', '#EE2E24', '#ffce0d', '#118d9b'];

//color function pulls from array of colors stored in color.js
var color = d3.scale.ordinal().range(colorsarray);

//define the approx. number of x scale ticks
var xscaleticks = 10;

//defines a function to be used to append the title to the tooltip.  you can set how you want it to display here.
var maketip = function(d) {
    var tip = '<p class="tip3">' + d.name + '<p class="tip1">' + NumbType(d.value) + '</p> <p class="tip3">' + formatDate(d.date) + '</p>';
    return tip;
}
//define your year format here, first for the x scale, then if the date is displayed in tooltips
var parseDate = d3.time.format("%m/%d/%y").parse;
var formatDate = d3.time.format("%m/%d/%y");

//create an SVG
var svg = d3.select("#graphic").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//make a rectangle so there is something to click on
svg.append("svg:rect").attr("width", width).attr("height", height).attr("class", "plot");

//make a clip path for the graph
var clip = svg.append("svg:clipPath").attr("id", "clip").append("svg:rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height);

// force data to update when menu is changed
var menu = d3.select("#menu select").on("change", change);

//suck in the data, store it in a value called formatted, run the redraw function
formatted = displayDataHandler();
redraw();

function displayDataHandler() {

    var dataVals = handleData(), dataArr = [];

    for (var i = 0; i < 62; i++) {

        var tempArr = dataVals[i], dates = getDate(i);

        if (i < 31) {

            dataArr.push({
                type : "boarding",
                date : dates,
                A : tempArr[0],
                B : tempArr[1],
                C : tempArr[2],
                D : tempArr[3],
                E : tempArr[4],
                F : tempArr[5],
                G : tempArr[6],
                J : tempArr[7],
                K : tempArr[8],
                L : tempArr[9],
                M : tempArr[10],
                O : tempArr[11],
                P : tempArr[12],
                Q : tempArr[13],
                S : tempArr[14],
                T : tempArr[15],
                V : tempArr[16],
                W : tempArr[17]
            });

        } else {

            dataArr.push({
                type : "deboarding",
                date : dates,
                A : tempArr[0],
                B : tempArr[1],
                C : tempArr[2],
                D : tempArr[3],
                E : tempArr[4],
                F : tempArr[5],
                G : tempArr[6],
                J : tempArr[7],
                K : tempArr[8],
                L : tempArr[9],
                M : tempArr[10],
                O : tempArr[11],
                P : tempArr[12],
                Q : tempArr[13],
                S : tempArr[14],
                T : tempArr[15],
                V : tempArr[16],
                W : tempArr[17]
            });

        }

    }

    return dataArr;
    //alert("herehere");
}

function handleData() {
    //alert("handleData");
    var retval;
    $.ajax({
        async : false,
        type : "GET",
        url : "unitrans-oct-2011.csv",
        dataType : "text",
        success : function(data) {
            retval = processData(data);

        }
    });
    return retval;
}

function processData(file) {
    //alert("processData");
    var fileLines = file.split(/\r\n|\n/);
    var headers = fileLines[0].split(',');

    var stopArr = [], dateArr = [], timeArr = [], boardArr = [], deboardArr = [], routeArr = [];

    for (var i = 1; i < fileLines.length; i++) {
        var data = fileLines[i].split(',');
        if (data.length == headers.length) {
            stopArr.push(data[0]);
            dateArr.push(data[1]);
            timeArr.push(parseFloat(data[2]));
            boardArr.push(parseInt(data[3]));
            deboardArr.push(parseInt(data[4]));
            routeArr.push(data[5]);
        }
    }

    var retval = getBoardingDataPerDay(dateArr, boardArr, deboardArr, routeArr);

    return retval;
}

function getBoardingDataPerDay(dateArr, boardArr, deboardArr, routeArr) {

    //alert("getBoardingDataPerDay");

    // There will be 31 arrays for each day of the month of October
    var Oct1B = [], Oct2B = [], Oct3B = [], Oct4B = [], Oct5B = [], Oct6B = [], Oct7B = [], Oct8B = [], Oct9B = [], Oct10B = [], Oct11B = [], Oct12B = [], Oct13B = [], Oct14B = [], Oct15B = [], Oct16B = [], Oct17B = [], Oct18B = [], Oct19B = [], Oct20B = [], Oct21B = [], Oct22B = [], Oct23B = [], Oct24B = [], Oct25B = [], Oct26B = [], Oct27B = [], Oct28B = [], Oct29B = [], Oct30B = [], Oct31B = [], Oct1DB = [], Oct2DB = [], Oct3DB = [], Oct4DB = [], Oct5DB = [], Oct6DB = [], Oct7DB = [], Oct8DB = [], Oct9DB = [], Oct10DB = [], Oct11DB = [], Oct12DB = [], Oct13DB = [], Oct14DB = [], Oct15DB = [], Oct16DB = [], Oct17DB = [], Oct18DB = [], Oct19DB = [], Oct20DB = [], Oct21DB = [], Oct22DB = [], Oct23DB = [], Oct24DB = [], Oct25DB = [], Oct26DB = [], Oct27DB = [], Oct28DB = [], Oct29DB = [], Oct30DB = [], Oct31DB = [];

    for (var i = 0; i < 19; i++) {
        Oct1B[i] = 0;
        Oct2B[i] = 0;
        Oct3B[i] = 0;
        Oct4B[i] = 0;
        Oct5B[i] = 0;
        Oct6B[i] = 0;
        Oct7B[i] = 0;
        Oct8B[i] = 0;
        Oct9B[i] = 0;
        Oct10B[i] = 0;
        Oct11B[i] = 0;
        Oct12B[i] = 0;
        Oct13B[i] = 0;
        Oct14B[i] = 0;
        Oct15B[i] = 0;
        Oct16B[i] = 0;
        Oct17B[i] = 0;
        Oct18B[i] = 0;
        Oct19B[i] = 0;
        Oct20B[i] = 0;
        Oct21B[i] = 0;
        Oct22B[i] = 0;
        Oct23B[i] = 0;
        Oct24B[i] = 0;
        Oct25B[i] = 0;
        Oct26B[i] = 0;
        Oct27B[i] = 0;
        Oct28B[i] = 0;
        Oct29B[i] = 0;
        Oct30B[i] = 0;
        Oct31B[i] = 0;

        Oct1DB[i] = 0;
        Oct2DB[i] = 0;
        Oct3DB[i] = 0;
        Oct4DB[i] = 0;
        Oct5DB[i] = 0;
        Oct6DB[i] = 0;
        Oct7DB[i] = 0;
        Oct8DB[i] = 0;
        Oct9DB[i] = 0;
        Oct10DB[i] = 0;
        Oct11DB[i] = 0;
        Oct12DB[i] = 0;
        Oct13DB[i] = 0;
        Oct14DB[i] = 0;
        Oct15DB[i] = 0;
        Oct16DB[i] = 0;
        Oct17DB[i] = 0;
        Oct18DB[i] = 0;
        Oct19DB[i] = 0;
        Oct20DB[i] = 0;
        Oct21DB[i] = 0;
        Oct22DB[i] = 0;
        Oct23DB[i] = 0;
        Oct24DB[i] = 0;
        Oct25DB[i] = 0;
        Oct26DB[i] = 0;
        Oct27DB[i] = 0;
        Oct28DB[i] = 0;
        Oct29DB[i] = 0;
        Oct30DB[i] = 0;
        Oct31DB[i] = 0;
    }

    // Each bus line will have a route code number
    // Going through the bus lines in alphabetical order: A = 0, B = 1 ... W = 18
    var routeCode;
    // For each day of the month of Oct, the number of passengers will be recorded
    // Each total number for that day will be saved in the corresponding day array
    // The index of each day array will correspond to a route code
    // The entry in an index of a particular day array maintains how many passengers for each bus for that day
    for (var i = 0; i < boardArr.length; i++) {
        routeCode = getRouteForEachStop(routeArr, i);

        if (dateArr[i] === "2012-10-01") {
            Oct1B[routeCode] += boardArr[i];
            Oct1DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-02") {
            Oct2B[routeCode] += boardArr[i];
            Oct2DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-03") {
            Oct3B[routeCode] += boardArr[i];
            Oct3DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-04") {
            Oct4B[routeCode] += boardArr[i];
            Oct4DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-05") {
            Oct5B[routeCode] += boardArr[i];
            Oct5DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-06") {
            Oct6B[routeCode] += boardArr[i];
            Oct6DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-07") {
            Oct7B[routeCode] += boardArr[i];
            Oct7DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-08") {
            Oct8B[routeCode] += boardArr[i];
            Oct8DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-09") {
            Oct9B[routeCode] += boardArr[i];
            Oct9DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-10") {
            Oct10B[routeCode] += boardArr[i];
            Oct10DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-11") {
            Oct11B[routeCode] += boardArr[i];
            Oct11DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-12") {
            Oct12B[routeCode] += boardArr[i];
            Oct12DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-13") {
            Oct13B[routeCode] += boardArr[i];
            Oct13DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-14") {
            Oct14B[routeCode] += boardArr[i];
            Oct14DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-15") {
            Oct15B[routeCode] += boardArr[i];
            Oct15DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-16") {
            Oct16B[routeCode] += boardArr[i];
            Oct16DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-17") {
            Oct17B[routeCode] += boardArr[i];
            Oct17DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-18") {
            Oct18B[routeCode] += boardArr[i];
            Oct18DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-19") {
            Oct19B[routeCode] += boardArr[i];
            Oct19DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-20") {
            Oct20B[routeCode] += boardArr[i];
            Oct20DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-21") {
            Oct21B[routeCode] += boardArr[i];
            Oct21DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-22") {
            Oct22B[routeCode] += boardArr[i];
            Oct22DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-23") {
            Oct23B[routeCode] += boardArr[i];
            Oct23DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-24") {
            Oct24B[routeCode] += boardArr[i];
            Oct24DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-25") {
            Oct25B[routeCode] += boardArr[i];
            Oct25DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-26") {
            Oct26B[routeCode] += boardArr[i];
            Oct26DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-27") {
            Oct27B[routeCode] += boardArr[i];
            Oct27DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-28") {
            Oct28B[routeCode] += boardArr[i];
            Oct28DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-29") {
            Oct29B[routeCode] += boardArr[i];
            Oct29DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-30") {
            Oct30B[routeCode] += boardArr[i];
            Oct30DB[routeCode] += deboardArr[i];
        } else if (dateArr[i] === "2012-10-31") {
            Oct31B[routeCode] += boardArr[i];
            Oct31DB[routeCode] += deboardArr[i];
        }

    }
    //alert(Oct1DB);
    return [Oct1B, Oct2B, Oct3B, Oct4B, Oct5B, Oct6B, Oct7B, Oct8B, Oct9B, Oct10B, Oct11B, Oct12B, Oct13B, Oct14B, Oct15B, Oct16B, Oct17B, Oct18B, Oct19B, Oct20B, Oct21B, Oct22B, Oct23B, Oct24B, Oct25B, Oct26B, Oct27B, Oct28B, Oct29B, Oct30B, Oct31B, Oct1DB, Oct2DB, Oct3DB, Oct4DB, Oct5DB, Oct6DB, Oct7DB, Oct8DB, Oct9DB, Oct10DB, Oct11DB, Oct12DB, Oct13DB, Oct14DB, Oct15DB, Oct16DB, Oct17DB, Oct18DB, Oct19DB, Oct20DB, Oct21DB, Oct22DB, Oct23DB, Oct24DB, Oct25DB, Oct26DB, Oct27DB, Oct28DB, Oct29DB, Oct30DB, Oct31DB];

}

function getRouteForEachStop(routeArr, i) {

    switch(routeArr[i]) {
    case "A":
        return 0;
    case "B":
        return 1;
    case "C":
        return 2;
    case "D":
        return 3;
    case "E":
        return 4;
    case "F":
        return 5;
    case "G":
        return 6;
    case "J":
        return 7;
    case "K":
        return 8;
    case "L":
        return 9;
    case "M":
        return 10;
    case "O":
        return 11;
    case "P":
        return 12;
    case "Q":
        return 13;
    case "S":
        return 14;
    case "T":
        return 15;
    case "V":
        return 16;
    case "W":
        return 17;
    }

}

function getDate(i) {
    switch(i) {
    case 0:
    case 31:
        return "10/1/12"
    case 1:
    case 32:
        return "10/2/12"
    case 2:
    case 33:
        return "10/3/12"
    case 3:
    case 34:
        return "10/4/12"
    case 4:
    case 35:
        return "10/5/12"
    case 5:
    case 36:
        return "10/6/12"
    case 6:
    case 37:
        return "10/7/12"
    case 7:
    case 38:
        return "10/8/12"
    case 8:
    case 39:
        return "10/9/12"
    case 9:
    case 40:
        return "10/10/12"
    case 10:
    case 41:
        return "10/11/12"
    case 11:
    case 42:
        return "10/12/12"
    case 12:
    case 43:
        return "10/13/12"
    case 13:
    case 44:
        return "10/14/12"
    case 14:
    case 45:
        return "10/15/12"
    case 15:
    case 46:
        return "10/16/12"
    case 16:
    case 47:
        return "10/17/12"
    case 17:
    case 48:
        return "10/18/12"
    case 18:
    case 49:
        return "10/19/12"
    case 19:
    case 50:
        return "10/20/12"
    case 20:
    case 51:
        return "10/21/12"
    case 21:
    case 52:
        return "10/22/12"
    case 22:
    case 53:
        return "10/23/12"
    case 23:
    case 54:
        return "10/24/12"
    case 24:
    case 55:
        return "10/25/12"
    case 25:
    case 56:
        return "10/26/12"
    case 26:
    case 57:
        return "10/27/12"
    case 27:
    case 58:
        return "10/28/12"
    case 28:
    case 59:
        return "10/29/12"
    case 29:
    case 60:
        return "10/30/12"
    case 30:
    case 61:
        return "10/31/12"
    }
}


d3.select(window).on("keydown", function() {
    altKey = d3.event.altKey;
}).on("keyup", function() {
    altKey = false;
});
var altKey;

// set terms of transition that will take place
// when a new economic indicator is chosen
function change() {
    d3.transition().duration( altKey ? 7500 : 1500).each(redraw);
}

// all the meat goes in the redraw function
function redraw() {

    // create data nests based on economic indicator (series)
    var nested = d3.nest().key(function(d) {
        return d.type;
    }).map(formatted)

    // get value from menu selection
    // the option values are set in HTML and correspond
    //to the [type] value we used to nest the data
    var series = menu.property("value");

    // only retrieve data from the selected series, using the nest we just created
    var data = nested[series];

    // for object constancy we will need to set "keys", one for each type of data (column name) exclude all others.
    color.domain(d3.keys(data[0]).filter(function(key) {
        return (key !== "date" && key !== "type");
    }));

    var linedata = color.domain().map(function(name) {
        return {
            name : name,
            values : data.map(function(d) {
                return {
                    name : name,
                    date : parseDate(d.date),
                    value : parseFloat(d[name], 10)
                };
            })
        };
    });

    //make an empty variable to stash the last values into so i can sort the legend
    var lastvalues = [];

    //setup the x and y scales
    var x = d3.time.scale().domain([d3.min(linedata, function(c) {
        return d3.min(c.values, function(v) {
            return v.date;
        });
    }), d3.max(linedata, function(c) {
        return d3.max(c.values, function(v) {
            return v.date;
        });
    })]).range([0, width]);

    var y = d3.scale.linear().domain([d3.min(linedata, function(c) {
        return d3.min(c.values, function(v) {
            return v.value;
        });
    }), d3.max(linedata, function(c) {
        return d3.max(c.values, function(v) {
            return v.value;
        });
    })]).range([height, 0]);

    //will draw the line
    var line = d3.svg.line().x(function(d) {
        return x(d.date);
    }).y(function(d) {
        return y(d.value);
    });

    //define the zoom
    var zoom = d3.behavior.zoom().x(x).y(y).scaleExtent([1, 8]).on("zoom", zoomed);

    //call the zoom on the SVG
    svg.call(zoom);

    //create and draw the x axis
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(8).ticks(xscaleticks);

    svg.append("svg:g").attr("class", "x axis");

    //create and draw the y axis
    var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0 - width).tickPadding(8);

    svg.append("svg:g").attr("class", "y axis");

    //bind the data
    var thegraph = svg.selectAll(".thegraph").data(linedata)

    //append a g tag for each line and set of tooltip circles and give it a unique ID based on the column name of the data
    var thegraphEnter = thegraph.enter().append("g").attr("clip-path", "url(#clip)").attr("class", "thegraph").attr('id', function(d) {
        return d.name + "-line";
    }).style("stroke-width", 2.5).on("mouseover", function(d) {
        d3.select(this)//on mouseover of each line, give it a nice thick stroke
        .style("stroke-width", '6px');

        var selectthegraphs = $('.thegraph').not(this);
        //select all the rest of the lines, except the one you are hovering on and drop their opacity
        d3.selectAll(selectthegraphs).style("opacity", 0.2);

        var getname = document.getElementById(d.name);
        //use get element cause the ID names have spaces in them
        var selectlegend = $('.legend').not(getname);
        //grab all the legend items that match the line you are on, except the one you are hovering on

        d3.selectAll(selectlegend)// drop opacity on other legend names
        .style("opacity", .2);

        d3.select(getname).attr("class", "legend-select");
        //change the class on the legend name that corresponds to hovered line to be bolder
    }).on("mouseout", function(d) {//undo everything on the mouseout
        d3.select(this).style("stroke-width", '2.5px');

        var selectthegraphs = $('.thegraph').not(this);
        d3.selectAll(selectthegraphs).style("opacity", 1);

        var getname = document.getElementById(d.name);
        var getname2 = $('.legend[fakeclass="fakelegend"]')
        var selectlegend = $('.legend').not(getname2).not(getname);

        d3.selectAll(selectlegend).style("opacity", 1);

        d3.select(getname).attr("class", "legend");
    });

    //actually append the line to the graph
    thegraphEnter.append("path").attr("class", "line").style("stroke", function(d) {
        return color(d.name);
    }).attr("d", function(d) {
        return line(d.values[0]);
    }).transition().duration(2000).attrTween('d', function(d) {
        var interpolate = d3.scale.quantile().domain([0, 1]).range(d3.range(1, d.values.length + 1));
        return function(t) {
            return line(d.values.slice(0, interpolate(t)));
        };
    });

    //then append some 'nearly' invisible circles at each data point
    thegraph.selectAll("circle").data(function(d) {
        return (d.values);
    }).enter().append("circle").attr("class", "tipcircle").attr("cx", function(d, i) {
        return x(d.date)
    }).attr("cy", function(d, i) {
        return y(d.value)
    }).attr("r", 12).style('opacity', 1e-6)//1e-6
    .attr("title", maketip);

    //append the legend
    var legend = svg.selectAll('.legend').data(linedata);

    var legendEnter = legend.enter().append('g').attr('class', 'legend').attr('id', function(d) {
        return d.name;
    }).on('click', function(d) {//onclick function to toggle off the lines
        if ($(this).css("opacity") == 1) {//uses the opacity of the item clicked on to determine whether to turn the line on or off

            var elemented = document.getElementById(this.id + "-line");
            //grab the line that has the same ID as this point along w/ "-line"  use get element cause ID has spaces
            d3.select(elemented).transition().duration(1000).style("opacity", 0).style("display", 'none');

            d3.select(this).attr('fakeclass', 'fakelegend').transition().duration(1000).style("opacity", .2);
        } else {

            var elemented = document.getElementById(this.id + "-line");
            d3.select(elemented).style("display", "block").transition().duration(1000).style("opacity", 1);

            d3.select(this).attr('fakeclass', 'legend').transition().duration(1000).style("opacity", 1);
        }
    });

    //create a scale to pass the legend items through
    var legendscale = d3.scale.ordinal().domain(lastvalues).range([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480, 510]);

    //actually add the circles to the created legend container
    legendEnter.append('circle').attr('cx', width + 50).attr('cy', function(d) {
        return legendscale(d.values[d.values.length - 1].value);
    }).attr('r', 7).style('fill', function(d) {
        return color(d.name);
    });

    //add the legend text
    legendEnter.append('text').attr('x', width + 65).attr('y', function(d) {
        return legendscale(d.values[d.values.length - 1].value);
    }).text(function(d) {
        return d.name;
    });

    // set variable for updating visualization
    var thegraphUpdate = d3.transition(thegraph);

    // change values of path and then the circles to those of the new series
    thegraphUpdate.select("path").attr("d", function(d, i) {

        //must be a better place to put this, but this works for now
        lastvalues[i] = d.values[d.values.length - 1].value;
        //lastvalues.sort(function (a,b){return b-a});
        legendscale.domain(lastvalues);

        return line(d.values);
    });

    thegraphUpdate.selectAll("circle").attr("title", maketip).attr("cy", function(d, i) {
        return y(d.value)
    }).attr("cx", function(d, i) {
        return x(d.date)
    });

    // and now for legend items
    var legendUpdate = d3.transition(legend);

    legendUpdate.select("circle").attr('cy', function(d, i) {
        return legendscale(d.values[d.values.length - 1].value);
    });

    legendUpdate.select("text").attr('y', function(d) {
        return legendscale(d.values[d.values.length - 1].value);
    });

    // update the axes,
    d3.transition(svg).select(".y.axis").call(yAxis);

    d3.transition(svg).select(".x.axis").attr("transform", "translate(0," + height + ")").call(xAxis);

    //make my tooltips work
    $('circle').tipsy({
        opacity : .9,
        gravity : 'n',
        html : true
    });

    //define the zoom function
    function zoomed() {

        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);

        svg.selectAll(".tipcircle").attr("cx", function(d, i) {
            return x(d.date)
        }).attr("cy", function(d, i) {
            return y(d.value)
        });

        svg.selectAll(".line").attr("class", "line").attr("d", function(d) {
            return line(d.values)
        });
    }

    //end of the redraw function
}


svg.append("svg:text").attr("text-anchor", "start").attr("x", 0 - margin.left).attr("y", height + margin.bottom - 10).attr("class", "source");
