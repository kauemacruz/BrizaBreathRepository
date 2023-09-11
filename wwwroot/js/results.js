var fetchedDataArray = [];

$.ajax({
    url: "/?fetchData=true",
    type: 'GET',
    success: function (data) {
        fetchedDataArray = data;
        // Call a function to initialize the charts here
        BRTinitializeChart();
        YOGICinitializeChart();
        BREinitializeChart();
        BRWinitializeChart();
        HUMinitializeChart();
        BBinitializeChart();
        LUNGSinitializeChart();
        APinitializeChart();
        CTinitializeChart();
        BOXinitializeChart();
        UBinitializeChart();
    },
    error: function (error) {
        console.error("Error fetching data:", error);
    }
});

//accordion function
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
        // Toggle the display of the content when the header is clicked
        const content = this.nextElementSibling;
        // Collapse all other content sections
        accordionHeaders.forEach(otherHeader => {
            if (otherHeader !== this) {
                otherHeader.nextElementSibling.style.display = 'none';
            }
        });
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});
const accordionHeaders2 = document.querySelectorAll('.accordion-header2');
accordionHeaders2.forEach(header => {
    header.addEventListener('click', function () {
        // Toggle the display of the content when the header is clicked
        const content = this.nextElementSibling;
        // Collapse all other content sections
        accordionHeaders2.forEach(otherHeader => {
            if (otherHeader !== this) {
                otherHeader.nextElementSibling.style.display = 'none';
            }
        });
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});
// Function to parse time strings (MM:SS) to seconds
function parseTimeToSeconds(timeString) {
    var parts = timeString.split(':');
    var minutes = parseInt(parts[0]);
    var seconds = parseInt(parts[1]);
    return minutes * 60 + seconds;
}
// Function to parse time strings (HH:MM:SS) to seconds
function parseTimeToSeconds2(timeString) {
    var parts = timeString.split(':');
    var hours = parseInt(parts[0]);
    var minutes = parseInt(parts[1]);
    var seconds = parseInt(parts[2]);
    return hours * 3600 + minutes * 60 + seconds;
}
function secondsToMinutes(seconds) {
    const minutes = seconds / 60;
    return minutes.toFixed(2); // Display with 2 decimal places
}
function formatDateAsDMY(date) {
    var dateObject = new Date(date); // Parse ISO 8601 date string into Date object

    var day = dateObject.getDate();
    var month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
    var year = dateObject.getFullYear();

    // Pad single-digit days and months with leading zeros
    var formattedDay = day < 10 ? '0' + day : day;
    var formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
}
function getYear(date) {
    var dateObject = new Date(date); // Parse ISO 8601 date string into Date object
    var year = dateObject.getFullYear();

    return `${year}`;
}

function convertMinToMinSec(minutes) {
    // Calculate the whole minutes and remaining seconds
    const wholeMinutes = Math.floor(minutes);
    const remainingSeconds = Math.round((minutes - wholeMinutes) * 60);

    // Create a string representation
    var result = `${wholeMinutes} min`;

    if (remainingSeconds > 0) {
        result += ` & ${remainingSeconds} sec `;
    }

    return result;
}

// BRT
// Initialize startDate and endDate
var BRTtoday = new Date();
var BRTlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var BRTresultDate = new Date(BRTtoday);
    BRTresultDate.setDate(BRTtoday.getDate() - i);
    BRTlast7Dates.push(BRTresultDate); // Push the Date object directly
}

var BRTendDate = BRTlast7Dates[BRTlast7Dates.length - 1]; // Initialize with the latest date
var BRTstartDate = BRTlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var BRTtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var BRTContainer = document.getElementById('BRTContainer');
BRTContainer.addEventListener('touchstart', function (event) {
    BRTtouchStartX = event.touches[0].clientX;
});

var BRTscrollThreshold = 10; // Adjust this value to control the scroll threshold

var BRTlastScrollX = null;
var { BRTchartData, BRTmaxYValue, BRTselectedDataDatesYear } = BRTupdateChartData(BRTstartDate, BRTendDate, fetchedDataArray);
var BRTinfoOverview = document.getElementById('BRTinfoOverview');
var BRTdateOfLongestResult;
var BRTlastDate;
var BRTlatestResult;
var BRTchart;
function BRTinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var BRTdateA = new Date(a.BRTresultDate);
        var BRTdateB = new Date(b.BRTresultDate);
        return BRTdateA - BRTdateB;
    });
    var BRTselectedDataDatesMonthDay = BRTselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    BRTchart = new Chart("BRTchart", {
        type: "bar",
        data: {
            labels: BRTselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: BRTchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your BRT results in seconds " + "(" + getYear(BRTendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        // Customize the tooltip title here (e.g., return 'Custom Title')
                        return 'Average Score on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        // Customize the tooltip label format here (e.g., return 'Label: Value')
                        return label + ': ' + Math.round(value * 100) / 100 + ' seconds';
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: BRTmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    BRTContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (BRTtouchStartX !== null) {
            var BRTtouchMoveX = event.touches[0].clientX;

            if (BRTlastScrollX !== null) {
                var BRTdelta = BRTtouchMoveX - BRTlastScrollX;

                if (Math.abs(BRTdelta) >= BRTscrollThreshold) {
                    BRTlastScrollX = BRTtouchMoveX;

                    if (BRTdelta > 0) {
                        // Scroll right, decrease the date range
                        BRTendDate.setDate(BRTendDate.getDate() - 1);
                        BRTstartDate.setDate(BRTstartDate.getDate() - 1);
                        BRTchart.options.title.text = "Your BRT results in seconds " + "(" + getYear(BRTendDate) + ")";
                    } else if (BRTdelta < 0) {
                        if (formatDateAsDMY(BRTendDate) == formatDateAsDMY(BRTtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BRTendDate.setDate(BRTendDate.getDate() + 1);
                            BRTstartDate.setDate(BRTstartDate.getDate() + 1);
                            BRTchart.options.title.text = "Your BRT results in seconds " + "(" + getYear(BRTendDate) + ")";
                        }
                    }
                    BRTupdateChart(BRTstartDate, BRTendDate);
                }
            } else {
                BRTlastScrollX = BRTtouchMoveX;
            }
        }
    });

    BRTContainer.addEventListener('touchend', function () {
        BRTlastScrollX = null;
    });
    BRTContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var BRTdelta = event.deltaX * 0.1;

        if (BRTdelta < 0) {
            // Scroll left, decrease the date range
            BRTendDate.setDate(BRTendDate.getDate() - 1);
            BRTstartDate.setDate(BRTstartDate.getDate() - 1);
            BRTchart.options.title.text = "Your BRT results in seconds " + "(" + getYear(BRTendDate) + ")";
        } else if (BRTdelta > 0) {
            if (formatDateAsDMY(BRTendDate) == formatDateAsDMY(BRTtoday)) { }
            else {
                // Scroll right, increase the date range
                BRTendDate.setDate(BRTendDate.getDate() + 1);
                BRTstartDate.setDate(BRTstartDate.getDate() + 1);
                BRTchart.options.title.text = "Your BRT results in seconds " + "(" + getYear(BRTendDate) + ")";
            }
        }
        BRTupdateChart(BRTstartDate, BRTendDate);
    });
    BRTupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function BRThandleBarClick(event, array) {
        var BRTindex = array[0]._index; // Get the clicked bar index
        var BRTselectedDate = BRTselectedDataDatesYear[BRTindex];
        BRTdisplayDetailedInfo(BRTselectedDate);
    }
    BRTchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BRThandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BRTchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BRThandleBarClick(event, array);
            }
        };
    }
}

function BRTfindMaxResult() {
    var BRTmaxResult = 0;

    fetchedDataArray.forEach(BRTresultData => {
        var BRTtimeString = BRTresultData.brtResultScore;

        // Check if the timeString is not empty before parsing
        if (BRTtimeString !== undefined && BRTtimeString !== '' && BRTtimeString !== null) {
            var seconds = parseTimeToSeconds(BRTtimeString);
            BRTmaxResult = Math.max(BRTmaxResult, seconds);
        }
    });

    return BRTmaxResult;
}
function BRTupdateChartData(BRTstartDate, BRTendDate) {
    var BRTdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var BRTcurrentDate = new Date(BRTstartDate);
    while (BRTcurrentDate <= BRTendDate) {
        BRTdateRange.push(new Date(BRTcurrentDate));
        BRTcurrentDate.setDate(BRTcurrentDate.getDate() + 1); // Move to the next day
    }

    var BRTaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(BRTresultData => {
        var BRTresultDate = new Date(BRTresultData.brtResultDate);
        var BRTseconds;
        var BRTtimeString = BRTresultData.brtResultScore;
        if (BRTtimeString !== undefined && BRTtimeString !== '' && BRTtimeString !== null) {
            BRTseconds = parseTimeToSeconds(BRTtimeString);
        } else {
            BRTseconds = 0;
        }
        if (!isNaN(BRTresultDate.getTime())) {
            var BRTformattedDate = formatDateAsDMY(BRTresultDate);

            if (!BRTaggregatedData[BRTformattedDate]) {
                BRTaggregatedData[BRTformattedDate] = { BRTtotalValue: BRTseconds, count: 1 };
            } else {
                BRTaggregatedData[BRTformattedDate].BRTtotalValue += BRTseconds;
                BRTaggregatedData[BRTformattedDate].count++;
            }
        }
    });

    var BRTmaxResult = BRTfindMaxResult();
    var BRTchartData = BRTdateRange.map(BRTresultDate => {
        var BRTformattedDate = formatDateAsDMY(BRTresultDate);
        var BRTaggregatedDatum = BRTaggregatedData[BRTformattedDate];
        return BRTaggregatedDatum ? BRTaggregatedDatum.BRTtotalValue / BRTaggregatedDatum.count : 0;
    });

    return {
        BRTchartData: BRTchartData,
        BRTmaxYValue: BRTmaxResult + 10,
        BRTselectedDataDatesYear: BRTdateRange.map(formatDateAsDMY)
    };
}
function BRTupdateChart(BRTstartDate, BRTendDate) {
    var { BRTchartData, BRTmaxYValue, BRTselectedDataDatesYear } = BRTupdateChartData(BRTstartDate, BRTendDate);

    // Update x-axis labels and chart data
    var BRTselectedDataDatesMonthDay = BRTselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    BRTchart.data.labels = BRTselectedDataDatesMonthDay;
    BRTchart.data.datasets[0].data = BRTchartData;
    BRTchart.options.scales.yAxes[0].ticks.max = BRTmaxYValue;
    function BRThandleBarClick(event, array) {
        var BRTindex = array[0]._index; // Get the clicked bar index
        var BRTselectedDate = BRTselectedDataDatesYear[BRTindex];
        BRTdisplayDetailedInfo(BRTselectedDate);
    }
    BRTchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BRThandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BRTchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BRThandleBarClick(event, array);
            }
        };
    }
    BRTchart.update();
}
function BRTupdateOverview() {
    var BRTnumberOfTests = 0;
    var BRTmax = BRTfindMaxResult();
    var BRTinfoOverviewElements = document.getElementsByClassName('BRTinfoOverview');
    fetchedDataArray.forEach(BRTresultData => {
        var BRTtimeString = BRTresultData.brtResultScore;
        var BRTdateString = BRTresultData.brtResultDate;
        // Check if the timeString is not empty before parsing
        if (BRTtimeString !== undefined && BRTtimeString !== '' && BRTtimeString !== null) {
            var BRTseconds = parseTimeToSeconds(BRTtimeString);
            // Store the value of dateOfLongestResult when BRTmax is updated
            if (BRTseconds === BRTmax) {
                BRTdateOfLongestResult = BRTdateString;
            }
            BRTlatestResult = parseTimeToSeconds(BRTtimeString);
            BRTlastDate = BRTdateString;
            BRTnumberOfTests++;
        }
    });
    if (BRTnumberOfTests == 1) {
        var BRTinnerText = '';
        for (var i = 0; i < BRTinfoOverviewElements.length; i++) {
            BRTinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('BRTContainer').style.display = 'block';
        if (BRTlatestResult <= 10) {
            BRTinnerText = 'Based on your first test (' + BRTlatestResult + ' seconds), it seems that your resilience to CO2 is very low.<br>';
            BRTinnerText += '<br> You may experience difficulties getting a good night\'s sleep, frequent mouth breathing, waking up with a dry mouth, frequent yawning, and low energy levels during the day.<br>';
            BRTinnerText += '<br> It is recommended that you focus on establishing a routine based on the foundations and basics of the Briza Program to improve your fitness and well-being.';
            BRTinfoOverview.innerHTML = BRTinnerText;
        } else if (BRTlatestResult > 10 && BRTlatestResult < 20) {
            BRTinnerText = 'Based on your first test (' + BRTlatestResult + ' seconds), your resilience to CO2 falls in the intermediate range.<br>';
            BRTinnerText += '<br>You may experience occasional mouth breathing, slight sleep disturbances, and mild daytime fatigue.<br>';
            BRTinnerText += '<br> It is recommended that you establish a routine based on the foundations and basics of the Briza Program to improve your fitness and well-being. Feel free to start exploring the rest of the app, especially the Pranayama section';
            BRTinfoOverview.innerHTML = BRTinnerText;
        } else if (BRTlatestResult >= 20 && BRTlatestResult <= 30) {
            BRTinnerText = 'Based on your first test (' + BRTlatestResult + ' seconds), your resilience to CO2 is relatively good.<br>';
            BRTinnerText += '<br> You are likely breathing through your nose most of the time and enjoying restful sleep. Your energy levels and concentration are generally satisfactory.<br>';
            BRTinnerText += '<br> It is recommended that you establish a routine based on the Intermediate level of the Briza Program. Add lungs expansion and the breath holds exercises to your daily practice. You can also challenge yourself with some Pranayama exercises';
            BRTinfoOverview.innerHTML = BRTinnerText;
        } else if (BRTlatestResult > 30) {
            BRTinnerText = 'Based on your first test (' + BRTlatestResult + ' seconds), your resilience to CO2 is excellent.<br>';
            BRTinnerText += '<br> You are likely experiencing the benefits of efficient breathing, including restorative sleep, high energy levels, and good focus.<br>';
            BRTinnerText += '<br> It is recommended that you establish a routine based on the Advanced level of the Briza Program. Make sure to keep up the good results. Explore the app to add more health habits to your routine.';
            BRTinfoOverview.innerHTML = BRTinnerText;
        }
        document.getElementById('BRTnumberOfSessions').value = BRTnumberOfTests + ' Tests';
        document.getElementById('BRTlongestRound').value = BRTmax + ' seconds ' + formatDateAsDMY(BRTdateOfLongestResult);
        document.getElementById('BRTlatestRound').value = BRTlatestResult + ' seconds ' + formatDateAsDMY(BRTlastDate);
    } else if (BRTnumberOfTests > 1) {
        var BRTinnerText = '';
        for (var i = 0; i < BRTinfoOverviewElements.length; i++) {
            BRTinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('BRTContainer').style.display = 'block';
        if (BRTlatestResult <= 10) {
            BRTinnerText = 'Based on your latest test (' + BRTlatestResult + ' seconds), it seems that your resilience to CO2 is very low.<br>';
            BRTinnerText += '<br>You may experience difficulties getting a good night\'s sleep, frequent mouth breathing, waking up with a dry mouth, frequent yawning, and low energy levels during the day.<br>';
            BRTinnerText += '<br>It is recommended that you focus on establishing a routine based on the foundations and basics of the Briza Program to improve your fitness and well-being.';
            BRTinfoOverview.innerHTML = BRTinnerText;
        } else if (BRTlatestResult > 10 && BRTlatestResult < 20) {
            BRTinnerText = 'Based on your latest test (' + BRTlatestResult + ' seconds), your resilience to CO2 falls in the intermediate range.<br>';
            BRTinnerText += '<br>You may experience occasional mouth breathing, slight sleep disturbances, and mild daytime fatigue.<br>';
            BRTinnerText += '<br>It is recommended that you establish a routine based on the foundations and basics of the Briza Program to improve your fitness and well-being. Feel free to start exploring the rest of the app, especially the Pranayama section';
            BRTinfoOverview.innerHTML = BRTinnerText;
        } else if (BRTlatestResult >= 20 && BRTlatestResult <= 30) {
            BRTinnerText = 'Based on your latest test (' + BRTlatestResult + ' seconds), your resilience to CO2 is relatively good.<br>';
            BRTinnerText += '<br>You are likely breathing through your nose most of the time and enjoying restful sleep. Your energy levels and concentration are generally satisfactory.<br>';
            BRTinnerText += '<br>It is recommended that you establish a routine based on the Intermediate level of the Briza Program. Add lungs expansion and the breath holds exercises to your daily practice. You can also challenge yourself with some Pranayama exercises';
            BRTinfoOverview.innerHTML = BRTinnerText;
        } else if (BRTlatestResult > 30) {
            BRTinnerText = 'Based on your latest test (' + BRTlatestResult + ' seconds), your resilience to CO2 is excellent.<br>';
            BRTinnerText += '<br>You are likely experiencing the benefits of efficient breathing, including restorative sleep, high energy levels, and good focus.<br>';
            BRTinnerText += '<br>It is recommended that you establish a routine based on the Advanced level of the Briza Program. Make sure to keep up the good results. Explore the app to add more health habits to your routine.';
            BRTinfoOverview.innerHTML = BRTinnerText;
        }
        if (BRTmax > BRTlatestResult) {
            BRTinnerText += '<br><br>Comparing with your longest Test, your results are dropping. Make sure to be consistent in your practice to get back to your best results.'
            BRTinfoOverview.innerHTML = BRTinnerText;
        } else {
            BRTinnerText += '<br><br>Well done. It looks that your latest test is also your longest. Keep following the Briza Program to achieve even better results'
            BRTinfoOverview.innerHTML = BRTinnerText;
        }
        document.getElementById('BRTnumberOfSessions').value = BRTnumberOfTests + ' Tests';
        document.getElementById('BRTlongestRound').value = BRTmax + ' seconds ' + formatDateAsDMY(BRTdateOfLongestResult);
        document.getElementById('BRTlatestRound').value = BRTlatestResult + ' seconds ' + formatDateAsDMY(BRTlastDate);
    } else if (BRTnumberOfTests == 0) {
        BRTinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < BRTinfoOverviewElements.length; i++) {
            BRTinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('BRTContainer').style.display = 'none';
    }
}


var BRTresultPage = document.getElementById('BRTresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    BRTresultDateHeader = document.getElementById('BRTresultDateHeader'),
    BRTresultSessions = document.getElementById('BRTresultSessions');

function BRTdisplayDetailedInfo(BRTselectedDate) {
    function BRTdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.BRTdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BRTdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BRTupdateChart(BRTstartDate, BRTendDate);
                            BRTupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var BRTnumberOfResults = 1;
    BRTresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(BRTresultData => {
        var BRTtimeString = BRTresultData.brtResultScore;
        var BRTdateString = BRTresultData.brtResultDate;
        var BRTresultId = BRTresultData.resultId;
        // Check if the timeString is not empty before parsing
        if (BRTtimeString !== undefined && BRTtimeString !== '' && BRTtimeString !== null) {
            var BRTseconds = parseTimeToSeconds(BRTtimeString);
            // Store the value of dateOfLongestResult when BRTmax is updated
            if (BRTselectedDate === formatDateAsDMY(BRTdateString)) {
                BRTresultDateHeader.innerHTML = 'Results on ' + BRTselectedDate;
                BRTresultSessions.innerHTML += '<form method="post" class="BRTdelete-form">' +
                    '<div>Test ' + BRTnumberOfResults + ' __________</div>' +
                    '<input value="' + BRTseconds + ' seconds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + BRTresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger BRTdelete-button" />' +
                    '</form>';
                BRTnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var BRTdeleteButtons = document.querySelectorAll('.BRTdelete-button');
    BRTdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var BRTform = this.closest('.BRTdelete-form');
            var BRTresultId = BRTform.querySelector('[name="resultId"]').value;
            BRTdeleteResult(BRTresultId);
        });
    });

    openPage(resultsPage, BRTresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END BRT
// LUNGS
// Initialize startDate and endDate
var LUNGStoday = new Date();
var LUNGSlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var LUNGSresultDate = new Date(LUNGStoday);
    LUNGSresultDate.setDate(LUNGStoday.getDate() - i);
    LUNGSlast7Dates.push(LUNGSresultDate); // Push the Date object directly
}

var LUNGSendDate = LUNGSlast7Dates[LUNGSlast7Dates.length - 1]; // Initialize with the latest date
var LUNGSstartDate = LUNGSlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var LUNGStouchStartX = null;
// Add event listener for mouse wheel on the canvas
var LUNGSContainer = document.getElementById('LUNGSContainer');
LUNGSContainer.addEventListener('touchstart', function (event) {
    LUNGStouchStartX = event.touches[0].clientX;
});

var LUNGSscrollThreshold = 10; // Adjust this value to control the scroll threshold

var LUNGSlastScrollX = null;
var { LUNGSchartData, LUNGSmaxYValue, LUNGSselectedDataDatesYear } = LUNGSupdateChartData(LUNGSstartDate, LUNGSendDate, fetchedDataArray);
var LUNGSinfoOverview = document.getElementById('LUNGSinfoOverview');
var LUNGSdateOfLongestResult;
var LUNGSlastDate;
var LUNGSlatestResult;
var LUNGSchart;
function LUNGSinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var LUNGSdateA = new Date(a.LUNGSresultDate);
        var LUNGSdateB = new Date(b.LUNGSresultDate);
        return LUNGSdateA - LUNGSdateB;
    });
    var LUNGSselectedDataDatesMonthDay = LUNGSselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    LUNGSchart = new Chart("LUNGSchart", {
        type: "bar",
        data: {
            labels: LUNGSselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: LUNGSchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your LUNGS results in seconds " + "(" + getYear(LUNGSendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        // Customize the tooltip title here (e.g., return 'Custom Title')
                        return 'Average Score on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        // Customize the tooltip label format here (e.g., return 'Label: Value')
                        return label + ': ' + Math.round(value * 100) / 100 + ' seconds';
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: LUNGSmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    LUNGSContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (LUNGStouchStartX !== null) {
            var LUNGStouchMoveX = event.touches[0].clientX;

            if (LUNGSlastScrollX !== null) {
                var LUNGSdelta = LUNGStouchMoveX - LUNGSlastScrollX;

                if (Math.abs(LUNGSdelta) >= LUNGSscrollThreshold) {
                    LUNGSlastScrollX = LUNGStouchMoveX;

                    if (LUNGSdelta > 0) {
                        // Scroll right, decrease the date range
                        LUNGSendDate.setDate(LUNGSendDate.getDate() - 1);
                        LUNGSstartDate.setDate(LUNGSstartDate.getDate() - 1);
                        LUNGSchart.options.title.text = "Your LUNGS results in seconds " + "(" + getYear(LUNGSendDate) + ")";
                    } else if (LUNGSdelta < 0) {
                        if (formatDateAsDMY(LUNGSendDate) == formatDateAsDMY(LUNGStoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            LUNGSendDate.setDate(LUNGSendDate.getDate() + 1);
                            LUNGSstartDate.setDate(LUNGSstartDate.getDate() + 1);
                            LUNGSchart.options.title.text = "Your LUNGS results in seconds " + "(" + getYear(LUNGSendDate) + ")";
                        }
                    }
                    LUNGSupdateChart(LUNGSstartDate, LUNGSendDate);
                }
            } else {
                LUNGSlastScrollX = LUNGStouchMoveX;
            }
        }
    });

    LUNGSContainer.addEventListener('touchend', function () {
        LUNGSlastScrollX = null;
    });
    LUNGSContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var LUNGSdelta = event.deltaX * 0.1;

        if (LUNGSdelta < 0) {
            // Scroll left, decrease the date range
            LUNGSendDate.setDate(LUNGSendDate.getDate() - 1);
            LUNGSstartDate.setDate(LUNGSstartDate.getDate() - 1);
            LUNGSchart.options.title.text = "Your LUNGS results in seconds " + "(" + getYear(LUNGSendDate) + ")";
        } else if (LUNGSdelta > 0) {
            if (formatDateAsDMY(LUNGSendDate) == formatDateAsDMY(LUNGStoday)) { }
            else {
                // Scroll right, increase the date range
                LUNGSendDate.setDate(LUNGSendDate.getDate() + 1);
                LUNGSstartDate.setDate(LUNGSstartDate.getDate() + 1);
                LUNGSchart.options.title.text = "Your LUNGS results in seconds " + "(" + getYear(LUNGSendDate) + ")";
            }
        }
        LUNGSupdateChart(LUNGSstartDate, LUNGSendDate);
    });
    LUNGSupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function LUNGShandleBarClick(event, array) {
        var LUNGSindex = array[0]._index; // Get the clicked bar index
        var LUNGSselectedDate = LUNGSselectedDataDatesYear[LUNGSindex];
        LUNGSdisplayDetailedInfo(LUNGSselectedDate);
    }
    LUNGSchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            LUNGShandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        LUNGSchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                LUNGShandleBarClick(event, array);
            }
        };
    }
}

function LUNGSfindMaxResult() {
    var LUNGSmaxResult = 0;

    fetchedDataArray.forEach(LUNGSresultData => {
        var LUNGStimeString = LUNGSresultData.lungsResultScore;

        // Check if the timeString is not empty before parsing
        if (LUNGStimeString !== undefined && LUNGStimeString !== '' && LUNGStimeString !== null) {
            var seconds = parseTimeToSeconds(LUNGStimeString);
            LUNGSmaxResult = Math.max(LUNGSmaxResult, seconds);
        }
    });

    return LUNGSmaxResult;
}
function LUNGSupdateChartData(LUNGSstartDate, LUNGSendDate) {
    var LUNGSdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var LUNGScurrentDate = new Date(LUNGSstartDate);
    while (LUNGScurrentDate <= LUNGSendDate) {
        LUNGSdateRange.push(new Date(LUNGScurrentDate));
        LUNGScurrentDate.setDate(LUNGScurrentDate.getDate() + 1); // Move to the next day
    }

    var LUNGSaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(LUNGSresultData => {
        var LUNGSresultDate = new Date(LUNGSresultData.lungsResultDate);
        var LUNGSseconds;
        var LUNGStimeString = LUNGSresultData.lungsResultScore;
        if (LUNGStimeString !== undefined && LUNGStimeString !== '' && LUNGStimeString !== null) {
            LUNGSseconds = parseTimeToSeconds(LUNGStimeString);
        } else {
            LUNGSseconds = 0;
        }
        if (!isNaN(LUNGSresultDate.getTime())) {
            var LUNGSformattedDate = formatDateAsDMY(LUNGSresultDate);

            if (!LUNGSaggregatedData[LUNGSformattedDate]) {
                LUNGSaggregatedData[LUNGSformattedDate] = { LUNGStotalValue: LUNGSseconds, count: 1 };
            } else {
                LUNGSaggregatedData[LUNGSformattedDate].LUNGStotalValue += LUNGSseconds;
                LUNGSaggregatedData[LUNGSformattedDate].count++;
            }
        }
    });

    var LUNGSmaxResult = LUNGSfindMaxResult();
    var LUNGSchartData = LUNGSdateRange.map(LUNGSresultDate => {
        var LUNGSformattedDate = formatDateAsDMY(LUNGSresultDate);
        var LUNGSaggregatedDatum = LUNGSaggregatedData[LUNGSformattedDate];
        return LUNGSaggregatedDatum ? LUNGSaggregatedDatum.LUNGStotalValue / LUNGSaggregatedDatum.count : 0;
    });

    return {
        LUNGSchartData: LUNGSchartData,
        LUNGSmaxYValue: LUNGSmaxResult + 10,
        LUNGSselectedDataDatesYear: LUNGSdateRange.map(formatDateAsDMY)
    };
}
function LUNGSupdateChart(LUNGSstartDate, LUNGSendDate) {
    var { LUNGSchartData, LUNGSmaxYValue, LUNGSselectedDataDatesYear } = LUNGSupdateChartData(LUNGSstartDate, LUNGSendDate);

    // Update x-axis labels and chart data
    var LUNGSselectedDataDatesMonthDay = LUNGSselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    LUNGSchart.data.labels = LUNGSselectedDataDatesMonthDay;
    LUNGSchart.data.datasets[0].data = LUNGSchartData;
    LUNGSchart.options.scales.yAxes[0].ticks.max = LUNGSmaxYValue;
    function LUNGShandleBarClick(event, array) {
        var LUNGSindex = array[0]._index; // Get the clicked bar index
        var LUNGSselectedDate = LUNGSselectedDataDatesYear[LUNGSindex];
        LUNGSdisplayDetailedInfo(LUNGSselectedDate);
    }
    LUNGSchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            LUNGShandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        LUNGSchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                LUNGShandleBarClick(event, array);
            }
        };
    }
    LUNGSchart.update();
}
function LUNGSupdateOverview() {
    var LUNGSnumberOfTests = 0;
    var LUNGSmax = LUNGSfindMaxResult();
    var LUNGSinfoOverviewElements = document.getElementsByClassName('LUNGSinfoOverview');
    fetchedDataArray.forEach(LUNGSresultData => {
        var LUNGStimeString = LUNGSresultData.lungsResultScore;
        var LUNGSdateString = LUNGSresultData.lungsResultDate;
        // Check if the timeString is not empty before parsing
        if (LUNGStimeString !== undefined && LUNGStimeString !== '' && LUNGStimeString !== null) {
            var LUNGSseconds = parseTimeToSeconds(LUNGStimeString);
            // Store the value of dateOfLongestResult when LUNGSmax is updated
            if (LUNGSseconds === LUNGSmax) {
                LUNGSdateOfLongestResult = LUNGSdateString;
            }
            LUNGSlatestResult = parseTimeToSeconds(LUNGStimeString);
            LUNGSlastDate = LUNGSdateString;
            LUNGSnumberOfTests++;
        }
    });
    if (LUNGSnumberOfTests == 1) {
        var LUNGSinnerText = '';
        for (var i = 0; i < LUNGSinfoOverviewElements.length; i++) {
            LUNGSinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('LUNGSContainer').style.display = 'block';
        if (LUNGSlatestResult <= 15) {
            LUNGSinnerText = 'Based on your first test (' + LUNGSlatestResult + ' seconds), it seems that your lungs capacity is very low.<br>';
            LUNGSinnerText += '<br>You may experience difficulties getting a good night\'s sleep, frequent mouth breathing, waking up with a dry mouth, frequent yawning, and low energy levels during the day.<br>';
            LUNGSinnerText += '<br>It is recommended that you practice the lungs expansion exercises once a week and focus on establishing a routine based on the foundations and basics of the Briza Program to improve your fitness and well-being.';
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        } else if (LUNGSlatestResult > 15 && LUNGSlatestResult < 25) {
            LUNGSinnerText = 'Based on your first test (' + LUNGSlatestResult + ' seconds), your lungs capacity falls in the intermediate range.<br>';
            LUNGSinnerText += '<br>It is recommended that you practice the lungs expansion exercises 2 to 3 times a week and focus on establishing a routine based on the foundations and basics of the Briza Program to improve your fitness and well-being.';
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        } else if (LUNGSlatestResult >= 25 && LUNGSlatestResult <= 40) {
            LUNGSinnerText = 'Based on your first test (' + LUNGSlatestResult + ' seconds), your lungs capacity is relatively good.<br>';
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        } else if (LUNGSlatestResult > 40) {
            LUNGSinnerText = 'Based on your first test (' + LUNGSlatestResult + ' seconds), your lungs capacity is excellent.<br>';
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        }
        document.getElementById('LUNGSnumberOfSessions').value = LUNGSnumberOfTests + ' Tests';
        document.getElementById('LUNGSlongestRound').value = LUNGSmax + ' seconds ' + formatDateAsDMY(LUNGSdateOfLongestResult);
        document.getElementById('LUNGSlatestRound').value = LUNGSlatestResult + ' seconds ' + formatDateAsDMY(LUNGSlastDate);
    } else if (LUNGSnumberOfTests > 1) {
        var LUNGSinnerText = '';
        for (var i = 0; i < LUNGSinfoOverviewElements.length; i++) {
            LUNGSinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('LUNGSContainer').style.display = 'block';
        if (LUNGSlatestResult <= 15) {
            LUNGSinnerText = 'Based on your latest test (' + LUNGSlatestResult + ' seconds), it seems that your lungs capacity is very low.<br>';
            LUNGSinnerText += '<br>You may experience difficulties getting a good night\'s sleep, frequent mouth breathing, waking up with a dry mouth, frequent yawning, and low energy levels during the day.<br>';
            LUNGSinnerText += '<br>It is recommended that you practice the lungs expansion exercises once a week and focus on establishing a routine based on the foundations and basics of the Briza Program to improve your fitness and well-being.';
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        } else if (LUNGSlatestResult > 15 && LUNGSlatestResult < 25) {
            LUNGSinnerText = 'Based on your latest test (' + LUNGSlatestResult + ' seconds), your lungs capacity falls in the intermediate range.<br>';
            LUNGSinnerText += '<br>It is recommended that you practice the lungs expansion exercises 2 to 3 times a week and focus on establishing a routine based on the foundations and basics of the Briza Program to improve your fitness and well-being.';
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        } else if (LUNGSlatestResult >= 25 && LUNGSlatestResult <= 40) {
            LUNGSinnerText = 'Based on your latest test (' + LUNGSlatestResult + ' seconds), your lungs capacity is relatively good.<br>';
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        } else if (LUNGSlatestResult > 40) {
            LUNGSinnerText = 'Based on your latest test (' + LUNGSlatestResult + ' seconds), your lungs capacity is excellent.<br>';
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        }
        if (LUNGSmax > LUNGSlatestResult) {
            LUNGSinnerText += '<br><br>Comparing with your longest Test, your results are dropping. Make sure to be consistent in your practice to get back to your best results.'
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        } else {
            LUNGSinnerText += '<br><br>Well done. It looks that your latest test is also your longest. Keep following the lungs expansion exercises to achieve even better results'
            LUNGSinfoOverview.innerHTML = LUNGSinnerText;
        }
        document.getElementById('LUNGSnumberOfSessions').value = LUNGSnumberOfTests + ' Tests';
        document.getElementById('LUNGSlongestRound').value = LUNGSmax + ' seconds ' + formatDateAsDMY(LUNGSdateOfLongestResult);
        document.getElementById('LUNGSlatestRound').value = LUNGSlatestResult + ' seconds ' + formatDateAsDMY(LUNGSlastDate);
    } else if (LUNGSnumberOfTests == 0) {
        LUNGSinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < LUNGSinfoOverviewElements.length; i++) {
            LUNGSinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('LUNGSContainer').style.display = 'none';
    }
}


var LUNGSresultPage = document.getElementById('LUNGSresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    LUNGSresultDateHeader = document.getElementById('LUNGSresultDateHeader'),
    LUNGSresultSessions = document.getElementById('LUNGSresultSessions');

function LUNGSdisplayDetailedInfo(LUNGSselectedDate) {
    function LUNGSdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.LUNGSdelete-form [name="resultId"][value="' + resultId + '"]').closest('.LUNGSdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            LUNGSupdateChart(LUNGSstartDate, LUNGSendDate);
                            LUNGSupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var LUNGSnumberOfResults = 1;
    LUNGSresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(LUNGSresultData => {
        var LUNGStimeString = LUNGSresultData.lungsResultScore;
        var LUNGSdateString = LUNGSresultData.lungsResultDate;
        var LUNGSresultId = LUNGSresultData.resultId;
        // Check if the timeString is not empty before parsing
        if (LUNGStimeString !== undefined && LUNGStimeString !== '' && LUNGStimeString !== null) {
            var LUNGSseconds = parseTimeToSeconds(LUNGStimeString);
            // Store the value of dateOfLongestResult when LUNGSmax is updated
            if (LUNGSselectedDate === formatDateAsDMY(LUNGSdateString)) {
                LUNGSresultDateHeader.innerHTML = 'Results on ' + LUNGSselectedDate;
                LUNGSresultSessions.innerHTML += '<form method="post" class="LUNGSdelete-form">' +
                    '<div>Test ' + LUNGSnumberOfResults + ' __________</div>' +
                    '<input value="' + LUNGSseconds + ' seconds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + LUNGSresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger LUNGSdelete-button" />' +
                    '</form>';
                LUNGSnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var LUNGSdeleteButtons = document.querySelectorAll('.LUNGSdelete-button');
    LUNGSdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var LUNGSform = this.closest('.LUNGSdelete-form');
            var LUNGSresultId = LUNGSform.querySelector('[name="resultId"]').value;
            LUNGSdeleteResult(LUNGSresultId);
        });
    });

    openPage(resultsPage, LUNGSresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END LUNGS
// YOGIC
// Initialize startDate and endDate
var YOGICtoday = new Date();
var YOGIClast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var YOGICresultDate = new Date(YOGICtoday);
    YOGICresultDate.setDate(YOGICtoday.getDate() - i);
    YOGIClast7Dates.push(YOGICresultDate); // Push the Date object directly
}

var YOGICendDate = YOGIClast7Dates[YOGIClast7Dates.length - 1]; // Initialize with the latest date
var YOGICstartDate = YOGIClast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var YOGICtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var YOGICContainer = document.getElementById('YOGICContainer');
YOGICContainer.addEventListener('touchstart', function (event) {
    YOGICtouchStartX = event.touches[0].clientX;
});

var YOGICscrollThreshold = 10; // Adjust this value to control the scroll threshold

var YOGIClastScrollX = null;
var { YOGICchartData, YOGICmaxYValue, YOGICselectedDataDatesYear } = YOGICupdateChartData(YOGICstartDate, YOGICendDate, fetchedDataArray);
var YOGICinfoOverview = document.getElementById('YOGICinfoOverview');
var YOGICdateOfLongestResult;
var YOGIClastIntervals;
var YOGICintervals;
var YOGIClastDate;
var YOGIClatestResult;
var YOGICchart;
function YOGICinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var YOGICdateA = new Date(a.YOGICresultDate);
        var YOGICdateB = new Date(b.YOGICresultDate);
        return YOGICdateA - YOGICdateB;
    });
    var YOGICselectedDataDatesMonthDay = YOGICselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    YOGICchart = new Chart("YOGICchart", {
        type: "bar",
        data: {
            labels: YOGICselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: YOGICchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your Yogic Breathing results " + "(" + getYear(YOGICendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        return 'Total Results on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + convertMinToMinSec(Math.round(value * 100) / 100);
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: YOGICmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    YOGICContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (YOGICtouchStartX !== null) {
            var YOGICtouchMoveX = event.touches[0].clientX;

            if (YOGIClastScrollX !== null) {
                var YOGICdelta = YOGICtouchMoveX - YOGIClastScrollX;

                if (Math.abs(YOGICdelta) >= YOGICscrollThreshold) {
                    YOGIClastScrollX = YOGICtouchMoveX;

                    if (YOGICdelta > 0) {
                        // Scroll right, decrease the date range
                        YOGICendDate.setDate(YOGICendDate.getDate() - 1);
                        YOGICstartDate.setDate(YOGICstartDate.getDate() - 1);
                        YOGICchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(YOGICendDate) + ")";
                    } else if (YOGICdelta < 0) {
                        if (formatDateAsDMY(YOGICendDate) == formatDateAsDMY(YOGICtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            YOGICendDate.setDate(YOGICendDate.getDate() + 1);
                            YOGICstartDate.setDate(YOGICstartDate.getDate() + 1);
                            YOGICchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(YOGICendDate) + ")";
                        }
                    }
                    YOGICupdateChart(YOGICstartDate, YOGICendDate);
                }
            } else {
                YOGIClastScrollX = YOGICtouchMoveX;
            }
        }
    });

    YOGICContainer.addEventListener('touchend', function () {
        YOGIClastScrollX = null;
    });
    YOGICContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var YOGICdelta = event.deltaX * 0.1;

        if (YOGICdelta < 0) {
            // Scroll left, decrease the date range
            YOGICendDate.setDate(YOGICendDate.getDate() - 1);
            YOGICstartDate.setDate(YOGICstartDate.getDate() - 1);
            YOGICchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(YOGICendDate) + ")";
        } else if (YOGICdelta > 0) {
            if (formatDateAsDMY(YOGICendDate) == formatDateAsDMY(YOGICtoday)) { }
            else {
                // Scroll right, increase the date range
                YOGICendDate.setDate(YOGICendDate.getDate() + 1);
                YOGICstartDate.setDate(YOGICstartDate.getDate() + 1);
                YOGICchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(YOGICendDate) + ")";
            }
        }
        YOGICupdateChart(YOGICstartDate, YOGICendDate);
    });
    YOGICupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function YOGIChandleBarClick(event, array) {
        var YOGICindex = array[0]._index; // Get the clicked bar index
        var YOGICselectedDate = YOGICselectedDataDatesYear[YOGICindex];
        YOGICdisplayDetailedInfo(YOGICselectedDate);
    }
    YOGICchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            YOGIChandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        YOGICchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                YOGIChandleBarClick(event, array);
            }
        };
    }
}

function YOGICfindMaxResult() {
    var YOGICmaxResult = 0;

    fetchedDataArray.forEach(YOGICresultData => {
        var YOGICtimeString = YOGICresultData.yogicTotalTime;

        // Check if the timeString is not empty before parsing
        if (YOGICtimeString !== undefined && YOGICtimeString !== '' && YOGICtimeString !== null) {
            var seconds = parseTimeToSeconds2(YOGICtimeString);
            YOGICmaxResult = Math.max(YOGICmaxResult, secondsToMinutes(seconds));
        }
    });
    return YOGICmaxResult;
}
function YOGICfindMaxResult2() {
    var YOGICmaxResult = 0;

    fetchedDataArray.forEach(YOGICresultData => {
        var YOGICtimeString = YOGICresultData.yogicTotalTime;

        // Check if the timeString is not empty before parsing
        if (YOGICtimeString !== undefined && YOGICtimeString !== '' && YOGICtimeString !== null) {
            var seconds = parseTimeToSeconds2(YOGICtimeString);
            YOGICmaxResult = Math.max(YOGICmaxResult, seconds);
        }
    });
    return YOGICmaxResult;
}
function YOGICupdateChartData(YOGICstartDate, YOGICendDate) {
    var YOGICdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var YOGICcurrentDate = new Date(YOGICstartDate);
    while (YOGICcurrentDate <= YOGICendDate) {
        YOGICdateRange.push(new Date(YOGICcurrentDate));
        YOGICcurrentDate.setDate(YOGICcurrentDate.getDate() + 1); // Move to the next day
    }

    var YOGICaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(YOGICresultData => {
        var YOGICresultDate = new Date(YOGICresultData.yogicResultDate);
        var YOGICseconds;
        var YOGICminutes;
        var YOGICtimeString = YOGICresultData.yogicTotalTime;
        if (YOGICtimeString !== undefined && YOGICtimeString !== '' && YOGICtimeString !== null) {
            YOGICseconds = parseTimeToSeconds2(YOGICtimeString);
            YOGICminutes = secondsToMinutes(YOGICseconds);
        } else {
            YOGICminutes = 0;
        }
        if (!isNaN(YOGICresultDate.getTime())) {
            var YOGICformattedDate = formatDateAsDMY(YOGICresultDate);

            if (!YOGICaggregatedData[YOGICformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                YOGICaggregatedData[YOGICformattedDate] = { YOGICtotalValue: parseFloat(YOGICminutes) };
            } else {
                // If the date already exists, update the existing entry
                YOGICaggregatedData[YOGICformattedDate].YOGICtotalValue += parseFloat(YOGICminutes);
            }
        }
    });

    var YOGICmaxResult = YOGICfindMaxResult();
    var YOGICchartData = YOGICdateRange.map(YOGICresultDate => {
        var YOGICformattedDate = formatDateAsDMY(YOGICresultDate);
        var YOGICaggregatedDatum = YOGICaggregatedData[YOGICformattedDate];
        return YOGICaggregatedDatum ? YOGICaggregatedDatum.YOGICtotalValue : 0;
    });

    return {
        YOGICchartData: YOGICchartData,
        YOGICmaxYValue: Math.floor(YOGICmaxResult + 2),
        YOGICselectedDataDatesYear: YOGICdateRange.map(formatDateAsDMY)
    };
}
function YOGICupdateChart(YOGICstartDate, YOGICendDate) {
    var { YOGICchartData, YOGICmaxYValue, YOGICselectedDataDatesYear } = YOGICupdateChartData(YOGICstartDate, YOGICendDate);

    // Update x-axis labels and chart data
    var YOGICselectedDataDatesMonthDay = YOGICselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    YOGICchart.data.labels = YOGICselectedDataDatesMonthDay;
    YOGICchart.data.datasets[0].data = YOGICchartData;
    YOGICchart.options.scales.yAxes[0].ticks.max = YOGICmaxYValue;
    function YOGIChandleBarClick(event, array) {
        var YOGICindex = array[0]._index; // Get the clicked bar index
        var YOGICselectedDate = YOGICselectedDataDatesYear[YOGICindex];
        YOGICdisplayDetailedInfo(YOGICselectedDate);
    }
    YOGICchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            YOGIChandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        YOGICchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                YOGIChandleBarClick(event, array);
            }
        };
    }
    YOGICchart.update();
}
function YOGICupdateOverview() {
    var YOGICnumberOfTests = 0;
    var YOGICmax = YOGICfindMaxResult();
    var YOGICmax2 = YOGICfindMaxResult2();
    var YOGICinfoOverviewElements = document.getElementsByClassName('YOGICinfoOverview');
    fetchedDataArray.forEach(YOGICresultData => {
        var YOGICtimeString = YOGICresultData.yogicTotalTime;
        var YOGICdateString = YOGICresultData.yogicResultDate;
        var YOGICrounds = YOGICresultData.yogicIntervals;
        // Check if the timeString is not empty before parsing
        if (YOGICtimeString !== undefined && YOGICtimeString !== '' && YOGICtimeString !== null) {
            var YOGICseconds = parseTimeToSeconds2(YOGICtimeString);
            // Store the value of dateOfLongestResult when YOGICmax is updated
            if (YOGICseconds === YOGICmax2) {
                YOGICdateOfLongestResult = YOGICdateString;
                YOGICintervals = YOGICrounds;
            }
            YOGIClatestResult = parseTimeToSeconds2(YOGICtimeString);
            YOGIClastDate = YOGICdateString;
            YOGIClastIntervals = YOGICrounds;
            YOGICnumberOfTests++;
        }
    });
    if (YOGICnumberOfTests !== 0) {
        YOGICinfoOverview.innerHTML = '';
        for (var i = 0; i < YOGICinfoOverviewElements.length; i++) {
            YOGICinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('YOGICContainer').style.display = 'block';
        document.getElementById('YOGICnumberOfSessions').value = YOGICnumberOfTests + ' Sessions';
        document.getElementById('YOGIClongestRound').value = convertMinToMinSec(YOGICmax) + YOGICintervals + ' rounds ' + formatDateAsDMY(YOGICdateOfLongestResult);
        document.getElementById('YOGIClatestRound').value = convertMinToMinSec(secondsToMinutes(YOGIClatestResult)) + YOGIClastIntervals + ' rounds ' + formatDateAsDMY(YOGIClastDate);
    } else{
        YOGICinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < YOGICinfoOverviewElements.length; i++) {
            YOGICinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('YOGICContainer').style.display = 'none';
    }
}
var YOGICresultPage = document.getElementById('YOGICresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    YOGICresultDateHeader = document.getElementById('YOGICresultDateHeader'),
    YOGICresultSessions = document.getElementById('YOGICresultSessions');

function YOGICdisplayDetailedInfo(YOGICselectedDate) {
    function YOGICdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.YOGICdelete-form [name="resultId"][value="' + resultId + '"]').closest('.YOGICdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            YOGICupdateChart(YOGICstartDate, YOGICendDate);
                            YOGICupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var YOGICnumberOfResults = 1;
    YOGICresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(YOGICresultData => {
        var YOGICtimeString = YOGICresultData.yogicTotalTime;
        var YOGICdateString = YOGICresultData.yogicResultDate;
        var YOGICresultId = YOGICresultData.resultId;
        YOGICintervals = YOGICresultData.yogicIntervals;
        // Check if the timeString is not empty before parsing
        if (YOGICtimeString !== undefined && YOGICtimeString !== '' && YOGICtimeString !== null) {
            var YOGICseconds = parseTimeToSeconds2(YOGICtimeString);
            // Store the value of dateOfLongestResult when YOGICmax is updated
            if (YOGICselectedDate === formatDateAsDMY(YOGICdateString)) {
                YOGICresultDateHeader.innerHTML = 'Results on ' + YOGICselectedDate;
                YOGICresultSessions.innerHTML += '<form method="post" class="YOGICdelete-form">' +
                    '<div>Session ' + YOGICnumberOfResults + ' __________</div>' +
                    '<input value="' + convertMinToMinSec(secondsToMinutes(YOGICseconds)) + ' " readonly class="resultInput"/>' +
                    '<input value="' + YOGICintervals + ' rounds" readonly class="resultInput"/>' + 
                    '<input name="resultId" value="' + YOGICresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger YOGICdelete-button" />' +
                    '</form>';
                YOGICnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var YOGICdeleteButtons = document.querySelectorAll('.YOGICdelete-button');
    YOGICdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var YOGICform = this.closest('.YOGICdelete-form');
            var YOGICresultId = YOGICform.querySelector('[name="resultId"]').value;
            YOGICdeleteResult(YOGICresultId);
        });
    });

    openPage(resultsPage, YOGICresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END YOGIC
// BRE
// Initialize startDate and endDate
var BREtoday = new Date();
var BRElast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var BREresultDate = new Date(BREtoday);
    BREresultDate.setDate(BREtoday.getDate() - i);
    BRElast7Dates.push(BREresultDate); // Push the Date object directly
}

var BREendDate = BRElast7Dates[BRElast7Dates.length - 1]; // Initialize with the latest date
var BREstartDate = BRElast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var BREtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var BREContainer = document.getElementById('BREContainer');
BREContainer.addEventListener('touchstart', function (event) {
    BREtouchStartX = event.touches[0].clientX;
});

var BREscrollThreshold = 10; // Adjust this value to control the scroll threshold

var BRElastScrollX = null;
var { BREchartData, BREmaxYValue, BREselectedDataDatesYear } = BREupdateChartData(BREstartDate, BREendDate, fetchedDataArray);
var BREinfoOverview = document.getElementById('BREinfoOverview');
var BREdateOfLongestResult;
var BRElastIntervals;
var BREintervals;
var BRElastDate;
var BRElatestResult;
var BREchart;
function BREinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var BREdateA = new Date(a.BREresultDate);
        var BREdateB = new Date(b.BREresultDate);
        return BREdateA - BREdateB;
    });
    var BREselectedDataDatesMonthDay = BREselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    BREchart = new Chart("BREchart", {
        type: "bar",
        data: {
            labels: BREselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: BREchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your Breath Recovery Exercise results " + "(" + getYear(BREendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        return 'Total Results on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + convertMinToMinSec(Math.round(value * 100) / 100);
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: BREmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    BREContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (BREtouchStartX !== null) {
            var BREtouchMoveX = event.touches[0].clientX;

            if (BRElastScrollX !== null) {
                var BREdelta = BREtouchMoveX - BRElastScrollX;

                if (Math.abs(BREdelta) >= BREscrollThreshold) {
                    BRElastScrollX = BREtouchMoveX;

                    if (BREdelta > 0) {
                        // Scroll right, decrease the date range
                        BREendDate.setDate(BREendDate.getDate() - 1);
                        BREstartDate.setDate(BREstartDate.getDate() - 1);
                        BREchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BREendDate) + ")";
                    } else if (BREdelta < 0) {
                        if (formatDateAsDMY(BREendDate) == formatDateAsDMY(BREtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BREendDate.setDate(BREendDate.getDate() + 1);
                            BREstartDate.setDate(BREstartDate.getDate() + 1);
                            BREchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BREendDate) + ")";
                        }
                    }
                    BREupdateChart(BREstartDate, BREendDate);
                }
            } else {
                BRElastScrollX = BREtouchMoveX;
            }
        }
    });

    BREContainer.addEventListener('touchend', function () {
        BRElastScrollX = null;
    });
    BREContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var BREdelta = event.deltaX * 0.1;

        if (BREdelta < 0) {
            // Scroll left, decrease the date range
            BREendDate.setDate(BREendDate.getDate() - 1);
            BREstartDate.setDate(BREstartDate.getDate() - 1);
            BREchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BREendDate) + ")";
        } else if (BREdelta > 0) {
            if (formatDateAsDMY(BREendDate) == formatDateAsDMY(BREtoday)) { }
            else {
                // Scroll right, increase the date range
                BREendDate.setDate(BREendDate.getDate() + 1);
                BREstartDate.setDate(BREstartDate.getDate() + 1);
                BREchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BREendDate) + ")";
            }
        }
        BREupdateChart(BREstartDate, BREendDate);
    });
    BREupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function BREhandleBarClick(event, array) {
        var BREindex = array[0]._index; // Get the clicked bar index
        var BREselectedDate = BREselectedDataDatesYear[BREindex];
        BREdisplayDetailedInfo(BREselectedDate);
    }
    BREchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BREhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BREchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BREhandleBarClick(event, array);
            }
        };
    }
}

function BREfindMaxResult() {
    var BREmaxResult = 0;

    fetchedDataArray.forEach(BREresultData => {
        var BREtimeString = BREresultData.breTotalTime;

        // Check if the timeString is not empty before parsing
        if (BREtimeString !== undefined && BREtimeString !== '' && BREtimeString !== null) {
            var seconds = parseTimeToSeconds2(BREtimeString);
            BREmaxResult = Math.max(BREmaxResult, secondsToMinutes(seconds));
        }
    });
    return BREmaxResult;
}
function BREfindMaxResult2() {
    var BREmaxResult = 0;

    fetchedDataArray.forEach(BREresultData => {
        var BREtimeString = BREresultData.breTotalTime;

        // Check if the timeString is not empty before parsing
        if (BREtimeString !== undefined && BREtimeString !== '' && BREtimeString !== null) {
            var seconds = parseTimeToSeconds2(BREtimeString);
            BREmaxResult = Math.max(BREmaxResult, seconds);
        }
    });
    return BREmaxResult;
}
function BREupdateChartData(BREstartDate, BREendDate) {
    var BREdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var BREcurrentDate = new Date(BREstartDate);
    while (BREcurrentDate <= BREendDate) {
        BREdateRange.push(new Date(BREcurrentDate));
        BREcurrentDate.setDate(BREcurrentDate.getDate() + 1); // Move to the next day
    }

    var BREaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(BREresultData => {
        var BREresultDate = new Date(BREresultData.breResultDate);
        var BREseconds;
        var BREminutes;
        var BREtimeString = BREresultData.breTotalTime;
        if (BREtimeString !== undefined && BREtimeString !== '' && BREtimeString !== null) {
            BREseconds = parseTimeToSeconds2(BREtimeString);
            BREminutes = secondsToMinutes(BREseconds);
        } else {
            BREminutes = 0;
        }
        if (!isNaN(BREresultDate.getTime())) {
            var BREformattedDate = formatDateAsDMY(BREresultDate);

            if (!BREaggregatedData[BREformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                BREaggregatedData[BREformattedDate] = { BREtotalValue: parseFloat(BREminutes) };
            } else {
                // If the date already exists, update the existing entry
                BREaggregatedData[BREformattedDate].BREtotalValue += parseFloat(BREminutes);
            }
        }
    });

    var BREmaxResult = BREfindMaxResult();
    var BREchartData = BREdateRange.map(BREresultDate => {
        var BREformattedDate = formatDateAsDMY(BREresultDate);
        var BREaggregatedDatum = BREaggregatedData[BREformattedDate];
        return BREaggregatedDatum ? BREaggregatedDatum.BREtotalValue : 0;
    });

    return {
        BREchartData: BREchartData,
        BREmaxYValue: Math.floor(BREmaxResult + 2),
        BREselectedDataDatesYear: BREdateRange.map(formatDateAsDMY)
    };
}
function BREupdateChart(BREstartDate, BREendDate) {
    var { BREchartData, BREmaxYValue, BREselectedDataDatesYear } = BREupdateChartData(BREstartDate, BREendDate);

    // Update x-axis labels and chart data
    var BREselectedDataDatesMonthDay = BREselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    BREchart.data.labels = BREselectedDataDatesMonthDay;
    BREchart.data.datasets[0].data = BREchartData;
    BREchart.options.scales.yAxes[0].ticks.max = BREmaxYValue;
    function BREhandleBarClick(event, array) {
        var BREindex = array[0]._index; // Get the clicked bar index
        var BREselectedDate = BREselectedDataDatesYear[BREindex];
        BREdisplayDetailedInfo(BREselectedDate);
    }
    BREchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BREhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BREchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BREhandleBarClick(event, array);
            }
        };
    }
    BREchart.update();
}
function BREupdateOverview() {
    var BREnumberOfTests = 0;
    var BREmax = BREfindMaxResult();
    var BREmax2 = BREfindMaxResult2();
    var BREinfoOverviewElements = document.getElementsByClassName('BREinfoOverview');
    fetchedDataArray.forEach(BREresultData => {
        var BREtimeString = BREresultData.breTotalTime;
        var BREdateString = BREresultData.breResultDate;
        var BRErounds = BREresultData.breIntervals;
        // Check if the timeString is not empty before parsing
        if (BREtimeString !== undefined && BREtimeString !== '' && BREtimeString !== null) {
            var BREseconds = parseTimeToSeconds2(BREtimeString);
            // Store the value of dateOfLongestResult when BREmax is updated
            if (BREseconds === BREmax2) {
                BREdateOfLongestResult = BREdateString;
                BREintervals = BRErounds;
            }
            BRElatestResult = parseTimeToSeconds2(BREtimeString);
            BRElastDate = BREdateString;
            BRElastIntervals = BRErounds;
            BREnumberOfTests++;
        }
    });
    if (BREnumberOfTests !== 0) {
        BREinfoOverview.innerHTML = '';
        for (var i = 0; i < BREinfoOverviewElements.length; i++) {
            BREinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('BREContainer').style.display = 'block';
        document.getElementById('BREnumberOfSessions').value = BREnumberOfTests + ' Sessions';
        document.getElementById('BRElongestRound').value = convertMinToMinSec(BREmax) + BREintervals + ' rounds ' + formatDateAsDMY(BREdateOfLongestResult);
        document.getElementById('BRElatestRound').value = convertMinToMinSec(secondsToMinutes(BRElatestResult)) + BRElastIntervals + ' rounds ' + formatDateAsDMY(BRElastDate);
    } else {
        BREinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < BREinfoOverviewElements.length; i++) {
            BREinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('BREContainer').style.display = 'none';
    }
}
var BREresultPage = document.getElementById('BREresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    BREresultDateHeader = document.getElementById('BREresultDateHeader'),
    BREresultSessions = document.getElementById('BREresultSessions');

function BREdisplayDetailedInfo(BREselectedDate) {
    function BREdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.BREdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BREdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BREupdateChart(BREstartDate, BREendDate);
                            BREupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var BREnumberOfResults = 1;
    BREresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(BREresultData => {
        var BREtimeString = BREresultData.breTotalTime;
        var BREdateString = BREresultData.breResultDate;
        var BREresultId = BREresultData.resultId;
        BREintervals = BREresultData.breIntervals;
        // Check if the timeString is not empty before parsing
        if (BREtimeString !== undefined && BREtimeString !== '' && BREtimeString !== null) {
            var BREseconds = parseTimeToSeconds2(BREtimeString);
            // Store the value of dateOfLongestResult when BREmax is updated
            if (BREselectedDate === formatDateAsDMY(BREdateString)) {
                BREresultDateHeader.innerHTML = 'Results on ' + BREselectedDate;
                BREresultSessions.innerHTML += '<form method="post" class="BREdelete-form">' +
                    '<div>Session ' + BREnumberOfResults + ' __________</div>' +
                    '<input value="' + convertMinToMinSec(secondsToMinutes(BREseconds)) + ' " readonly class="resultInput"/>' +
                    '<input value="' + BREintervals + ' rounds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + BREresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger BREdelete-button" />' +
                    '</form>';
                BREnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var BREdeleteButtons = document.querySelectorAll('.BREdelete-button');
    BREdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var BREform = this.closest('.BREdelete-form');
            var BREresultId = BREform.querySelector('[name="resultId"]').value;
            BREdeleteResult(BREresultId);
        });
    });

    openPage(resultsPage, BREresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END BRE
// BRW
// Initialize startDate and endDate
var BRWtoday = new Date();
var BRWlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var BRWresultDate = new Date(BRWtoday);
    BRWresultDate.setDate(BRWtoday.getDate() - i);
    BRWlast7Dates.push(BRWresultDate); // Push the Date object directly
}

var BRWendDate = BRWlast7Dates[BRWlast7Dates.length - 1]; // Initialize with the latest date
var BRWstartDate = BRWlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var BRWtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var BRWContainer = document.getElementById('BRWContainer');
BRWContainer.addEventListener('touchstart', function (event) {
    BRWtouchStartX = event.touches[0].clientX;
});

var BRWscrollThreshold = 10; // Adjust this value to control the scroll threshold

var BRWlastScrollX = null;
var { BRWchartData, BRWmaxYValue, BRWselectedDataDatesYear } = BRWupdateChartData(BRWstartDate, BRWendDate, fetchedDataArray);
var BRWinfoOverview = document.getElementById('BRWinfoOverview');
var BRWdateOfLongestResult;
var BRWlastIntervals;
var BRWintervals;
var BRWlastDate;
var BRWlatestResult;
var BRWchart;
function BRWinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var BRWdateA = new Date(a.BRWresultDate);
        var BRWdateB = new Date(b.BRWresultDate);
        return BRWdateA - BRWdateB;
    });
    var BRWselectedDataDatesMonthDay = BRWselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    BRWchart = new Chart("BRWchart", {
        type: "bar",
        data: {
            labels: BRWselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: BRWchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your Breath Recovery Exercise results " + "(" + getYear(BRWendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        return 'Total Results on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + convertMinToMinSec(Math.round(value * 100) / 100);
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: BRWmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    BRWContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (BRWtouchStartX !== null) {
            var BRWtouchMoveX = event.touches[0].clientX;

            if (BRWlastScrollX !== null) {
                var BRWdelta = BRWtouchMoveX - BRWlastScrollX;

                if (Math.abs(BRWdelta) >= BRWscrollThreshold) {
                    BRWlastScrollX = BRWtouchMoveX;

                    if (BRWdelta > 0) {
                        // Scroll right, decrease the date range
                        BRWendDate.setDate(BRWendDate.getDate() - 1);
                        BRWstartDate.setDate(BRWstartDate.getDate() - 1);
                        BRWchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BRWendDate) + ")";
                    } else if (BRWdelta < 0) {
                        if (formatDateAsDMY(BRWendDate) == formatDateAsDMY(BRWtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BRWendDate.setDate(BRWendDate.getDate() + 1);
                            BRWstartDate.setDate(BRWstartDate.getDate() + 1);
                            BRWchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BRWendDate) + ")";
                        }
                    }
                    BRWupdateChart(BRWstartDate, BRWendDate);
                }
            } else {
                BRWlastScrollX = BRWtouchMoveX;
            }
        }
    });

    BRWContainer.addEventListener('touchend', function () {
        BRWlastScrollX = null;
    });
    BRWContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var BRWdelta = event.deltaX * 0.1;

        if (BRWdelta < 0) {
            // Scroll left, decrease the date range
            BRWendDate.setDate(BRWendDate.getDate() - 1);
            BRWstartDate.setDate(BRWstartDate.getDate() - 1);
            BRWchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BRWendDate) + ")";
        } else if (BRWdelta > 0) {
            if (formatDateAsDMY(BRWendDate) == formatDateAsDMY(BRWtoday)) { }
            else {
                // Scroll right, increase the date range
                BRWendDate.setDate(BRWendDate.getDate() + 1);
                BRWstartDate.setDate(BRWstartDate.getDate() + 1);
                BRWchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BRWendDate) + ")";
            }
        }
        BRWupdateChart(BRWstartDate, BRWendDate);
    });
    BRWupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function BRWhandleBarClick(event, array) {
        var BRWindex = array[0]._index; // Get the clicked bar index
        var BRWselectedDate = BRWselectedDataDatesYear[BRWindex];
        BRWdisplayDetailedInfo(BRWselectedDate);
    }
    BRWchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BRWhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BRWchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BRWhandleBarClick(event, array);
            }
        };
    }
}

function BRWfindMaxResult() {
    var BRWmaxResult = 0;

    fetchedDataArray.forEach(BRWresultData => {
        var BRWtimeString = BRWresultData.brwTotalTime;

        // Check if the timeString is not empty before parsing
        if (BRWtimeString !== undefined && BRWtimeString !== '' && BRWtimeString !== null) {
            var seconds = parseTimeToSeconds2(BRWtimeString);
            BRWmaxResult = Math.max(BRWmaxResult, secondsToMinutes(seconds));
        }
    });
    return BRWmaxResult;
}
function BRWfindMaxResult2() {
    var BRWmaxResult = 0;

    fetchedDataArray.forEach(BRWresultData => {
        var BRWtimeString = BRWresultData.brwTotalTime;

        // Check if the timeString is not empty before parsing
        if (BRWtimeString !== undefined && BRWtimeString !== '' && BRWtimeString !== null) {
            var seconds = parseTimeToSeconds2(BRWtimeString);
            BRWmaxResult = Math.max(BRWmaxResult, seconds);
        }
    });
    return BRWmaxResult;
}
function BRWupdateChartData(BRWstartDate, BRWendDate) {
    var BRWdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var BRWcurrentDate = new Date(BRWstartDate);
    while (BRWcurrentDate <= BRWendDate) {
        BRWdateRange.push(new Date(BRWcurrentDate));
        BRWcurrentDate.setDate(BRWcurrentDate.getDate() + 1); // Move to the next day
    }

    var BRWaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(BRWresultData => {
        var BRWresultDate = new Date(BRWresultData.brwResultDate);
        var BRWseconds;
        var BRWminutes;
        var BRWtimeString = BRWresultData.brwTotalTime;
        if (BRWtimeString !== undefined && BRWtimeString !== '' && BRWtimeString !== null) {
            BRWseconds = parseTimeToSeconds2(BRWtimeString);
            BRWminutes = secondsToMinutes(BRWseconds);
        } else {
            BRWminutes = 0;
        }
        if (!isNaN(BRWresultDate.getTime())) {
            var BRWformattedDate = formatDateAsDMY(BRWresultDate);

            if (!BRWaggregatedData[BRWformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                BRWaggregatedData[BRWformattedDate] = { BRWtotalValue: parseFloat(BRWminutes) };
            } else {
                // If the date already exists, update the existing entry
                BRWaggregatedData[BRWformattedDate].BRWtotalValue += parseFloat(BRWminutes);
            }
        }
    });

    var BRWmaxResult = BRWfindMaxResult();
    var BRWchartData = BRWdateRange.map(BRWresultDate => {
        var BRWformattedDate = formatDateAsDMY(BRWresultDate);
        var BRWaggregatedDatum = BRWaggregatedData[BRWformattedDate];
        return BRWaggregatedDatum ? BRWaggregatedDatum.BRWtotalValue : 0;
    });

    return {
        BRWchartData: BRWchartData,
        BRWmaxYValue: Math.floor(BRWmaxResult + 2),
        BRWselectedDataDatesYear: BRWdateRange.map(formatDateAsDMY)
    };
}
function BRWupdateChart(BRWstartDate, BRWendDate) {
    var { BRWchartData, BRWmaxYValue, BRWselectedDataDatesYear } = BRWupdateChartData(BRWstartDate, BRWendDate);

    // Update x-axis labels and chart data
    var BRWselectedDataDatesMonthDay = BRWselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    BRWchart.data.labels = BRWselectedDataDatesMonthDay;
    BRWchart.data.datasets[0].data = BRWchartData;
    BRWchart.options.scales.yAxes[0].ticks.max = BRWmaxYValue;
    function BRWhandleBarClick(event, array) {
        var BRWindex = array[0]._index; // Get the clicked bar index
        var BRWselectedDate = BRWselectedDataDatesYear[BRWindex];
        BRWdisplayDetailedInfo(BRWselectedDate);
    }
    BRWchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BRWhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BRWchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BRWhandleBarClick(event, array);
            }
        };
    }
    BRWchart.update();
}
function BRWupdateOverview() {
    var BRWnumberOfTests = 0;
    var BRWmax = BRWfindMaxResult();
    var BRWmax2 = BRWfindMaxResult2();
    var BRWinfoOverviewElements = document.getElementsByClassName('BRWinfoOverview');
    fetchedDataArray.forEach(BRWresultData => {
        var BRWtimeString = BRWresultData.brwTotalTime;
        var BRWdateString = BRWresultData.brwResultDate;
        var BRWrounds = BRWresultData.brwIntervals;
        // Check if the timeString is not empty before parsing
        if (BRWtimeString !== undefined && BRWtimeString !== '' && BRWtimeString !== null) {
            var BRWseconds = parseTimeToSeconds2(BRWtimeString);
            // Store the value of dateOfLongestResult when BRWmax is updated
            if (BRWseconds === BRWmax2) {
                BRWdateOfLongestResult = BRWdateString;
                BRWintervals = BRWrounds;
            }
            BRWlatestResult = parseTimeToSeconds2(BRWtimeString);
            BRWlastDate = BRWdateString;
            BRWlastIntervals = BRWrounds;
            BRWnumberOfTests++;
        }
    });
    if (BRWnumberOfTests !== 0) {
        BRWinfoOverview.innerHTML = '';
        for (var i = 0; i < BRWinfoOverviewElements.length; i++) {
            BRWinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('BRWContainer').style.display = 'block';
        document.getElementById('BRWnumberOfSessions').value = BRWnumberOfTests + ' Sessions';
        document.getElementById('BRWlongestRound').value = convertMinToMinSec(BRWmax) + BRWintervals + ' rounds ' + formatDateAsDMY(BRWdateOfLongestResult);
        document.getElementById('BRWlatestRound').value = convertMinToMinSec(secondsToMinutes(BRWlatestResult)) + BRWlastIntervals + ' rounds ' + formatDateAsDMY(BRWlastDate);
    } else {
        BRWinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < BRWinfoOverviewElements.length; i++) {
            BRWinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('BRWContainer').style.display = 'none';
    }
}
var BRWresultPage = document.getElementById('BRWresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    BRWresultDateHeader = document.getElementById('BRWresultDateHeader'),
    BRWresultSessions = document.getElementById('BRWresultSessions');

function BRWdisplayDetailedInfo(BRWselectedDate) {
    function BRWdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.BRWdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BRWdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BRWupdateChart(BRWstartDate, BRWendDate);
                            BRWupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var BRWnumberOfResults = 1;
    BRWresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(BRWresultData => {
        var BRWtimeString = BRWresultData.brwTotalTime;
        var BRWdateString = BRWresultData.brwResultDate;
        var BRWresultId = BRWresultData.resultId;
        BRWintervals = BRWresultData.brwIntervals;
        // Check if the timeString is not empty before parsing
        if (BRWtimeString !== undefined && BRWtimeString !== '' && BRWtimeString !== null) {
            var BRWseconds = parseTimeToSeconds2(BRWtimeString);
            // Store the value of dateOfLongestResult when BRWmax is updated
            if (BRWselectedDate === formatDateAsDMY(BRWdateString)) {
                BRWresultDateHeader.innerHTML = 'Results on ' + BRWselectedDate;
                BRWresultSessions.innerHTML += '<form method="post" class="BRWdelete-form">' +
                    '<div>Session ' + BRWnumberOfResults + ' __________</div>' +
                    '<input value="' + convertMinToMinSec(secondsToMinutes(BRWseconds)) + ' " readonly class="resultInput"/>' +
                    '<input value="' + BRWintervals + ' rounds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + BRWresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger BRWdelete-button" />' +
                    '</form>';
                BRWnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var BRWdeleteButtons = document.querySelectorAll('.BRWdelete-button');
    BRWdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var BRWform = this.closest('.BRWdelete-form');
            var BRWresultId = BRWform.querySelector('[name="resultId"]').value;
            BRWdeleteResult(BRWresultId);
        });
    });

    openPage(resultsPage, BRWresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END BRW
// HUM
// Initialize startDate and endDate
var HUMtoday = new Date();
var HUMlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var HUMresultDate = new Date(HUMtoday);
    HUMresultDate.setDate(HUMtoday.getDate() - i);
    HUMlast7Dates.push(HUMresultDate); // Push the Date object directly
}

var HUMendDate = HUMlast7Dates[HUMlast7Dates.length - 1]; // Initialize with the latest date
var HUMstartDate = HUMlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var HUMtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var HUMContainer = document.getElementById('HUMContainer');
HUMContainer.addEventListener('touchstart', function (event) {
    HUMtouchStartX = event.touches[0].clientX;
});

var HUMscrollThreshold = 10; // Adjust this value to control the scroll threshold

var HUMlastScrollX = null;
var { HUMchartData, HUMmaxYValue, HUMselectedDataDatesYear } = HUMupdateChartData(HUMstartDate, HUMendDate, fetchedDataArray);
var HUMinfoOverview = document.getElementById('HUMinfoOverview');
var HUMdateOfLongestResult;
var HUMlastIntervals;
var HUMintervals;
var HUMlastDate;
var HUMlatestResult;
var HUMchart;
function HUMinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var HUMdateA = new Date(a.HUMresultDate);
        var HUMdateB = new Date(b.HUMresultDate);
        return HUMdateA - HUMdateB;
    });
    var HUMselectedDataDatesMonthDay = HUMselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    HUMchart = new Chart("HUMchart", {
        type: "bar",
        data: {
            labels: HUMselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: HUMchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your Breath Recovery Exercise results " + "(" + getYear(HUMendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        return 'Total Results on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + convertMinToMinSec(Math.round(value * 100) / 100);
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: HUMmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    HUMContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (HUMtouchStartX !== null) {
            var HUMtouchMoveX = event.touches[0].clientX;

            if (HUMlastScrollX !== null) {
                var HUMdelta = HUMtouchMoveX - HUMlastScrollX;

                if (Math.abs(HUMdelta) >= HUMscrollThreshold) {
                    HUMlastScrollX = HUMtouchMoveX;

                    if (HUMdelta > 0) {
                        // Scroll right, decrease the date range
                        HUMendDate.setDate(HUMendDate.getDate() - 1);
                        HUMstartDate.setDate(HUMstartDate.getDate() - 1);
                        HUMchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(HUMendDate) + ")";
                    } else if (HUMdelta < 0) {
                        if (formatDateAsDMY(HUMendDate) == formatDateAsDMY(HUMtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            HUMendDate.setDate(HUMendDate.getDate() + 1);
                            HUMstartDate.setDate(HUMstartDate.getDate() + 1);
                            HUMchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(HUMendDate) + ")";
                        }
                    }
                    HUMupdateChart(HUMstartDate, HUMendDate);
                }
            } else {
                HUMlastScrollX = HUMtouchMoveX;
            }
        }
    });

    HUMContainer.addEventListener('touchend', function () {
        HUMlastScrollX = null;
    });
    HUMContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var HUMdelta = event.deltaX * 0.1;

        if (HUMdelta < 0) {
            // Scroll left, decrease the date range
            HUMendDate.setDate(HUMendDate.getDate() - 1);
            HUMstartDate.setDate(HUMstartDate.getDate() - 1);
            HUMchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(HUMendDate) + ")";
        } else if (HUMdelta > 0) {
            if (formatDateAsDMY(HUMendDate) == formatDateAsDMY(HUMtoday)) { }
            else {
                // Scroll right, increase the date range
                HUMendDate.setDate(HUMendDate.getDate() + 1);
                HUMstartDate.setDate(HUMstartDate.getDate() + 1);
                HUMchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(HUMendDate) + ")";
            }
        }
        HUMupdateChart(HUMstartDate, HUMendDate);
    });
    HUMupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function HUMhandleBarClick(event, array) {
        var HUMindex = array[0]._index; // Get the clicked bar index
        var HUMselectedDate = HUMselectedDataDatesYear[HUMindex];
        HUMdisplayDetailedInfo(HUMselectedDate);
    }
    HUMchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            HUMhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        HUMchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                HUMhandleBarClick(event, array);
            }
        };
    }
}

function HUMfindMaxResult() {
    var HUMmaxResult = 0;

    fetchedDataArray.forEach(HUMresultData => {
        var HUMtimeString = HUMresultData.humTotalTime;

        // Check if the timeString is not empty before parsing
        if (HUMtimeString !== undefined && HUMtimeString !== '' && HUMtimeString !== null) {
            var seconds = parseTimeToSeconds2(HUMtimeString);
            HUMmaxResult = Math.max(HUMmaxResult, secondsToMinutes(seconds));
        }
    });
    return HUMmaxResult;
}
function HUMfindMaxResult2() {
    var HUMmaxResult = 0;

    fetchedDataArray.forEach(HUMresultData => {
        var HUMtimeString = HUMresultData.humTotalTime;

        // Check if the timeString is not empty before parsing
        if (HUMtimeString !== undefined && HUMtimeString !== '' && HUMtimeString !== null) {
            var seconds = parseTimeToSeconds2(HUMtimeString);
            HUMmaxResult = Math.max(HUMmaxResult, seconds);
        }
    });
    return HUMmaxResult;
}
function HUMupdateChartData(HUMstartDate, HUMendDate) {
    var HUMdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var HUMcurrentDate = new Date(HUMstartDate);
    while (HUMcurrentDate <= HUMendDate) {
        HUMdateRange.push(new Date(HUMcurrentDate));
        HUMcurrentDate.setDate(HUMcurrentDate.getDate() + 1); // Move to the next day
    }

    var HUMaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(HUMresultData => {
        var HUMresultDate = new Date(HUMresultData.humResultDate);
        var HUMseconds;
        var HUMminutes;
        var HUMtimeString = HUMresultData.humTotalTime;
        if (HUMtimeString !== undefined && HUMtimeString !== '' && HUMtimeString !== null) {
            HUMseconds = parseTimeToSeconds2(HUMtimeString);
            HUMminutes = secondsToMinutes(HUMseconds);
        } else {
            HUMminutes = 0;
        }
        if (!isNaN(HUMresultDate.getTime())) {
            var HUMformattedDate = formatDateAsDMY(HUMresultDate);

            if (!HUMaggregatedData[HUMformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                HUMaggregatedData[HUMformattedDate] = { HUMtotalValue: parseFloat(HUMminutes) };
            } else {
                // If the date already exists, update the existing entry
                HUMaggregatedData[HUMformattedDate].HUMtotalValue += parseFloat(HUMminutes);
            }
        }
    });

    var HUMmaxResult = HUMfindMaxResult();
    var HUMchartData = HUMdateRange.map(HUMresultDate => {
        var HUMformattedDate = formatDateAsDMY(HUMresultDate);
        var HUMaggregatedDatum = HUMaggregatedData[HUMformattedDate];
        return HUMaggregatedDatum ? HUMaggregatedDatum.HUMtotalValue : 0;
    });

    return {
        HUMchartData: HUMchartData,
        HUMmaxYValue: Math.floor(HUMmaxResult + 2),
        HUMselectedDataDatesYear: HUMdateRange.map(formatDateAsDMY)
    };
}
function HUMupdateChart(HUMstartDate, HUMendDate) {
    var { HUMchartData, HUMmaxYValue, HUMselectedDataDatesYear } = HUMupdateChartData(HUMstartDate, HUMendDate);

    // Update x-axis labels and chart data
    var HUMselectedDataDatesMonthDay = HUMselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    HUMchart.data.labels = HUMselectedDataDatesMonthDay;
    HUMchart.data.datasets[0].data = HUMchartData;
    HUMchart.options.scales.yAxes[0].ticks.max = HUMmaxYValue;
    function HUMhandleBarClick(event, array) {
        var HUMindex = array[0]._index; // Get the clicked bar index
        var HUMselectedDate = HUMselectedDataDatesYear[HUMindex];
        HUMdisplayDetailedInfo(HUMselectedDate);
    }
    HUMchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            HUMhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        HUMchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                HUMhandleBarClick(event, array);
            }
        };
    }
    HUMchart.update();
}
function HUMupdateOverview() {
    var HUMnumberOfTests = 0;
    var HUMmax = HUMfindMaxResult();
    var HUMmax2 = HUMfindMaxResult2();
    var HUMinfoOverviewElements = document.getElementsByClassName('HUMinfoOverview');
    fetchedDataArray.forEach(HUMresultData => {
        var HUMtimeString = HUMresultData.humTotalTime;
        var HUMdateString = HUMresultData.humResultDate;
        var HUMrounds = HUMresultData.humIntervals;
        // Check if the timeString is not empty before parsing
        if (HUMtimeString !== undefined && HUMtimeString !== '' && HUMtimeString !== null) {
            var HUMseconds = parseTimeToSeconds2(HUMtimeString);
            // Store the value of dateOfLongestResult when HUMmax is updated
            if (HUMseconds === HUMmax2) {
                HUMdateOfLongestResult = HUMdateString;
                HUMintervals = HUMrounds;
            }
            HUMlatestResult = parseTimeToSeconds2(HUMtimeString);
            HUMlastDate = HUMdateString;
            HUMlastIntervals = HUMrounds;
            HUMnumberOfTests++;
        }
    });
    if (HUMnumberOfTests !== 0) {
        HUMinfoOverview.innerHTML = '';
        for (var i = 0; i < HUMinfoOverviewElements.length; i++) {
            HUMinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('HUMContainer').style.display = 'block';
        document.getElementById('HUMnumberOfSessions').value = HUMnumberOfTests + ' Sessions';
        document.getElementById('HUMlongestRound').value = convertMinToMinSec(HUMmax) + HUMintervals + ' rounds ' + formatDateAsDMY(HUMdateOfLongestResult);
        document.getElementById('HUMlatestRound').value = convertMinToMinSec(secondsToMinutes(HUMlatestResult)) + HUMlastIntervals + ' rounds ' + formatDateAsDMY(HUMlastDate);
    } else {
        HUMinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < HUMinfoOverviewElements.length; i++) {
            HUMinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('HUMContainer').style.display = 'none';
    }
}
var HUMresultPage = document.getElementById('HUMresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    HUMresultDateHeader = document.getElementById('HUMresultDateHeader'),
    HUMresultSessions = document.getElementById('HUMresultSessions');

function HUMdisplayDetailedInfo(HUMselectedDate) {
    function HUMdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.HUMdelete-form [name="resultId"][value="' + resultId + '"]').closest('.HUMdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            HUMupdateChart(HUMstartDate, HUMendDate);
                            HUMupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var HUMnumberOfResults = 1;
    HUMresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(HUMresultData => {
        var HUMtimeString = HUMresultData.humTotalTime;
        var HUMdateString = HUMresultData.humResultDate;
        var HUMresultId = HUMresultData.resultId;
        HUMintervals = HUMresultData.humIntervals;
        // Check if the timeString is not empty before parsing
        if (HUMtimeString !== undefined && HUMtimeString !== '' && HUMtimeString !== null) {
            var HUMseconds = parseTimeToSeconds2(HUMtimeString);
            // Store the value of dateOfLongestResult when HUMmax is updated
            if (HUMselectedDate === formatDateAsDMY(HUMdateString)) {
                HUMresultDateHeader.innerHTML = 'Results on ' + HUMselectedDate;
                HUMresultSessions.innerHTML += '<form method="post" class="HUMdelete-form">' +
                    '<div>Session ' + HUMnumberOfResults + ' __________</div>' +
                    '<input value="' + convertMinToMinSec(secondsToMinutes(HUMseconds)) + ' " readonly class="resultInput"/>' +
                    '<input value="' + HUMintervals + ' rounds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + HUMresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger HUMdelete-button" />' +
                    '</form>';
                HUMnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var HUMdeleteButtons = document.querySelectorAll('.HUMdelete-button');
    HUMdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var HUMform = this.closest('.HUMdelete-form');
            var HUMresultId = HUMform.querySelector('[name="resultId"]').value;
            HUMdeleteResult(HUMresultId);
        });
    });

    openPage(resultsPage, HUMresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END HUM
// BB
// Initialize startDate and endDate
var BBtoday = new Date();
var BBlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var BBresultDate = new Date(BBtoday);
    BBresultDate.setDate(BBtoday.getDate() - i);
    BBlast7Dates.push(BBresultDate); // Push the Date object directly
}

var BBendDate = BBlast7Dates[BBlast7Dates.length - 1]; // Initialize with the latest date
var BBstartDate = BBlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var BBtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var BBContainer = document.getElementById('BBContainer');
BBContainer.addEventListener('touchstart', function (event) {
    BBtouchStartX = event.touches[0].clientX;
});

var BBscrollThreshold = 10; // Adjust this value to control the scroll threshold

var BBlastScrollX = null;
var { BBchartData, BBmaxYValue, BBselectedDataDatesYear } = BBupdateChartData(BBstartDate, BBendDate, fetchedDataArray);
var BBinfoOverview = document.getElementById('BBinfoOverview');
var BBdateOfLongestResult;
var BBlastIntervals;
var BBintervals;
var BBlastDate;
var BBlatestResult;
var BBchart;
function BBinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var BBdateA = new Date(a.BBresultDate);
        var BBdateB = new Date(b.BBresultDate);
        return BBdateA - BBdateB;
    });
    var BBselectedDataDatesMonthDay = BBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    BBchart = new Chart("BBchart", {
        type: "bar",
        data: {
            labels: BBselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: BBchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your Breath Recovery Exercise results " + "(" + getYear(BBendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        return 'Total Results on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + convertMinToMinSec(Math.round(value * 100) / 100);
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: BBmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    BBContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (BBtouchStartX !== null) {
            var BBtouchMoveX = event.touches[0].clientX;

            if (BBlastScrollX !== null) {
                var BBdelta = BBtouchMoveX - BBlastScrollX;

                if (Math.abs(BBdelta) >= BBscrollThreshold) {
                    BBlastScrollX = BBtouchMoveX;

                    if (BBdelta > 0) {
                        // Scroll right, decrease the date range
                        BBendDate.setDate(BBendDate.getDate() - 1);
                        BBstartDate.setDate(BBstartDate.getDate() - 1);
                        BBchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BBendDate) + ")";
                    } else if (BBdelta < 0) {
                        if (formatDateAsDMY(BBendDate) == formatDateAsDMY(BBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BBendDate.setDate(BBendDate.getDate() + 1);
                            BBstartDate.setDate(BBstartDate.getDate() + 1);
                            BBchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BBendDate) + ")";
                        }
                    }
                    BBupdateChart(BBstartDate, BBendDate);
                }
            } else {
                BBlastScrollX = BBtouchMoveX;
            }
        }
    });

    BBContainer.addEventListener('touchend', function () {
        BBlastScrollX = null;
    });
    BBContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var BBdelta = event.deltaX * 0.1;

        if (BBdelta < 0) {
            // Scroll left, decrease the date range
            BBendDate.setDate(BBendDate.getDate() - 1);
            BBstartDate.setDate(BBstartDate.getDate() - 1);
            BBchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BBendDate) + ")";
        } else if (BBdelta > 0) {
            if (formatDateAsDMY(BBendDate) == formatDateAsDMY(BBtoday)) { }
            else {
                // Scroll right, increase the date range
                BBendDate.setDate(BBendDate.getDate() + 1);
                BBstartDate.setDate(BBstartDate.getDate() + 1);
                BBchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BBendDate) + ")";
            }
        }
        BBupdateChart(BBstartDate, BBendDate);
    });
    BBupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function BBhandleBarClick(event, array) {
        var BBindex = array[0]._index; // Get the clicked bar index
        var BBselectedDate = BBselectedDataDatesYear[BBindex];
        BBdisplayDetailedInfo(BBselectedDate);
    }
    BBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BBhandleBarClick(event, array);
            }
        };
    }
}

function BBfindMaxResult() {
    var BBmaxResult = 0;

    fetchedDataArray.forEach(BBresultData => {
        var BBtimeString = BBresultData.bbTotalTime;

        // Check if the timeString is not empty before parsing
        if (BBtimeString !== undefined && BBtimeString !== '' && BBtimeString !== null) {
            var seconds = parseTimeToSeconds2(BBtimeString);
            BBmaxResult = Math.max(BBmaxResult, secondsToMinutes(seconds));
        }
    });
    return BBmaxResult;
}
function BBfindMaxResult2() {
    var BBmaxResult = 0;

    fetchedDataArray.forEach(BBresultData => {
        var BBtimeString = BBresultData.bbTotalTime;

        // Check if the timeString is not empty before parsing
        if (BBtimeString !== undefined && BBtimeString !== '' && BBtimeString !== null) {
            var seconds = parseTimeToSeconds2(BBtimeString);
            BBmaxResult = Math.max(BBmaxResult, seconds);
        }
    });
    return BBmaxResult;
}
function BBupdateChartData(BBstartDate, BBendDate) {
    var BBdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var BBcurrentDate = new Date(BBstartDate);
    while (BBcurrentDate <= BBendDate) {
        BBdateRange.push(new Date(BBcurrentDate));
        BBcurrentDate.setDate(BBcurrentDate.getDate() + 1); // Move to the next day
    }

    var BBaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(BBresultData => {
        var BBresultDate = new Date(BBresultData.bbResultDate);
        var BBseconds;
        var BBminutes;
        var BBtimeString = BBresultData.bbTotalTime;
        if (BBtimeString !== undefined && BBtimeString !== '' && BBtimeString !== null) {
            BBseconds = parseTimeToSeconds2(BBtimeString);
            BBminutes = secondsToMinutes(BBseconds);
        } else {
            BBminutes = 0;
        }
        if (!isNaN(BBresultDate.getTime())) {
            var BBformattedDate = formatDateAsDMY(BBresultDate);

            if (!BBaggregatedData[BBformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                BBaggregatedData[BBformattedDate] = { BBtotalValue: parseFloat(BBminutes) };
            } else {
                // If the date already exists, update the existing entry
                BBaggregatedData[BBformattedDate].BBtotalValue += parseFloat(BBminutes);
            }
        }
    });

    var BBmaxResult = BBfindMaxResult();
    var BBchartData = BBdateRange.map(BBresultDate => {
        var BBformattedDate = formatDateAsDMY(BBresultDate);
        var BBaggregatedDatum = BBaggregatedData[BBformattedDate];
        return BBaggregatedDatum ? BBaggregatedDatum.BBtotalValue : 0;
    });

    return {
        BBchartData: BBchartData,
        BBmaxYValue: Math.floor(BBmaxResult + 2),
        BBselectedDataDatesYear: BBdateRange.map(formatDateAsDMY)
    };
}
function BBupdateChart(BBstartDate, BBendDate) {
    var { BBchartData, BBmaxYValue, BBselectedDataDatesYear } = BBupdateChartData(BBstartDate, BBendDate);

    // Update x-axis labels and chart data
    var BBselectedDataDatesMonthDay = BBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    BBchart.data.labels = BBselectedDataDatesMonthDay;
    BBchart.data.datasets[0].data = BBchartData;
    BBchart.options.scales.yAxes[0].ticks.max = BBmaxYValue;
    function BBhandleBarClick(event, array) {
        var BBindex = array[0]._index; // Get the clicked bar index
        var BBselectedDate = BBselectedDataDatesYear[BBindex];
        BBdisplayDetailedInfo(BBselectedDate);
    }
    BBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BBhandleBarClick(event, array);
            }
        };
    }
    BBchart.update();
}
function BBupdateOverview() {
    var BBnumberOfTests = 0;
    var BBmax = BBfindMaxResult();
    var BBmax2 = BBfindMaxResult2();
    var BBinfoOverviewElements = document.getElementsByClassName('BBinfoOverview');
    fetchedDataArray.forEach(BBresultData => {
        var BBtimeString = BBresultData.bbTotalTime;
        var BBdateString = BBresultData.bbResultDate;
        var BBrounds = BBresultData.bbIntervals;
        // Check if the timeString is not empty before parsing
        if (BBtimeString !== undefined && BBtimeString !== '' && BBtimeString !== null) {
            var BBseconds = parseTimeToSeconds2(BBtimeString);
            // Store the value of dateOfLongestResult when BBmax is updated
            if (BBseconds === BBmax2) {
                BBdateOfLongestResult = BBdateString;
                BBintervals = BBrounds;
            }
            BBlatestResult = parseTimeToSeconds2(BBtimeString);
            BBlastDate = BBdateString;
            BBlastIntervals = BBrounds;
            BBnumberOfTests++;
        }
    });
    if (BBnumberOfTests !== 0) {
        BBinfoOverview.innerHTML = '';
        for (var i = 0; i < BBinfoOverviewElements.length; i++) {
            BBinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('BBContainer').style.display = 'block';
        document.getElementById('BBnumberOfSessions').value = BBnumberOfTests + ' Sessions';
        document.getElementById('BBlongestRound').value = convertMinToMinSec(BBmax) + BBintervals + ' rounds ' + formatDateAsDMY(BBdateOfLongestResult);
        document.getElementById('BBlatestRound').value = convertMinToMinSec(secondsToMinutes(BBlatestResult)) + BBlastIntervals + ' rounds ' + formatDateAsDMY(BBlastDate);
    } else {
        BBinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < BBinfoOverviewElements.length; i++) {
            BBinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('BBContainer').style.display = 'none';
    }
}
var BBresultPage = document.getElementById('BBresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    BBresultDateHeader = document.getElementById('BBresultDateHeader'),
    BBresultSessions = document.getElementById('BBresultSessions');

function BBdisplayDetailedInfo(BBselectedDate) {
    function BBdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.BBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BBupdateChart(BBstartDate, BBendDate);
                            BBupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var BBnumberOfResults = 1;
    BBresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(BBresultData => {
        var BBtimeString = BBresultData.bbTotalTime;
        var BBdateString = BBresultData.bbResultDate;
        var BBresultId = BBresultData.resultId;
        BBintervals = BBresultData.bbIntervals;
        // Check if the timeString is not empty before parsing
        if (BBtimeString !== undefined && BBtimeString !== '' && BBtimeString !== null) {
            var BBseconds = parseTimeToSeconds2(BBtimeString);
            // Store the value of dateOfLongestResult when BBmax is updated
            if (BBselectedDate === formatDateAsDMY(BBdateString)) {
                BBresultDateHeader.innerHTML = 'Results on ' + BBselectedDate;
                BBresultSessions.innerHTML += '<form method="post" class="BBdelete-form">' +
                    '<div>Session ' + BBnumberOfResults + ' __________</div>' +
                    '<input value="' + convertMinToMinSec(secondsToMinutes(BBseconds)) + ' " readonly class="resultInput"/>' +
                    '<input value="' + BBintervals + ' rounds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + BBresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger BBdelete-button" />' +
                    '</form>';
                BBnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var BBdeleteButtons = document.querySelectorAll('.BBdelete-button');
    BBdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var BBform = this.closest('.BBdelete-form');
            var BBresultId = BBform.querySelector('[name="resultId"]').value;
            BBdeleteResult(BBresultId);
        });
    });

    openPage(resultsPage, BBresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END BB
// AP
// Initialize startDate and endDate
var APtoday = new Date();
var APlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var APresultDate = new Date(APtoday);
    APresultDate.setDate(APtoday.getDate() - i);
    APlast7Dates.push(APresultDate); // Push the Date object directly
}

var APendDate = APlast7Dates[APlast7Dates.length - 1]; // Initialize with the latest date
var APstartDate = APlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var APtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var APContainer = document.getElementById('APContainer');
APContainer.addEventListener('touchstart', function (event) {
    APtouchStartX = event.touches[0].clientX;
});

var APscrollThreshold = 10; // Adjust this value to control the scroll threshold

var APlastScrollX = null;
var { APchartData, APmaxYValue, APselectedDataDatesYear } = APupdateChartData(APstartDate, APendDate, fetchedDataArray);
var APinfoOverview = document.getElementById('APinfoOverview');
var APdateOfLongestResult;
var APlastIntervals;
var APintervals;
var APlastDate;
var APlatestResult;
var APchart;
function APinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var APdateA = new Date(a.APresultDate);
        var APdateB = new Date(b.APresultDate);
        return APdateA - APdateB;
    });
    var APselectedDataDatesMonthDay = APselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    APchart = new Chart("APchart", {
        type: "bar",
        data: {
            labels: APselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: APchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your Yogic Breathing results " + "(" + getYear(APendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        return 'Total Results on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + convertMinToMinSec(Math.round(value * 100) / 100);
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: APmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    APContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (APtouchStartX !== null) {
            var APtouchMoveX = event.touches[0].clientX;

            if (APlastScrollX !== null) {
                var APdelta = APtouchMoveX - APlastScrollX;

                if (Math.abs(APdelta) >= APscrollThreshold) {
                    APlastScrollX = APtouchMoveX;

                    if (APdelta > 0) {
                        // Scroll right, decrease the date range
                        APendDate.setDate(APendDate.getDate() - 1);
                        APstartDate.setDate(APstartDate.getDate() - 1);
                        APchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(APendDate) + ")";
                    } else if (APdelta < 0) {
                        if (formatDateAsDMY(APendDate) == formatDateAsDMY(APtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            APendDate.setDate(APendDate.getDate() + 1);
                            APstartDate.setDate(APstartDate.getDate() + 1);
                            APchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(APendDate) + ")";
                        }
                    }
                    APupdateChart(APstartDate, APendDate);
                }
            } else {
                APlastScrollX = APtouchMoveX;
            }
        }
    });

    APContainer.addEventListener('touchend', function () {
        APlastScrollX = null;
    });
    APContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var APdelta = event.deltaX * 0.1;

        if (APdelta < 0) {
            // Scroll left, decrease the date range
            APendDate.setDate(APendDate.getDate() - 1);
            APstartDate.setDate(APstartDate.getDate() - 1);
            APchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(APendDate) + ")";
        } else if (APdelta > 0) {
            if (formatDateAsDMY(APendDate) == formatDateAsDMY(APtoday)) { }
            else {
                // Scroll right, increase the date range
                APendDate.setDate(APendDate.getDate() + 1);
                APstartDate.setDate(APstartDate.getDate() + 1);
                APchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(APendDate) + ")";
            }
        }
        APupdateChart(APstartDate, APendDate);
    });
    APupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function APhandleBarClick(event, array) {
        var APindex = array[0]._index; // Get the clicked bar index
        var APselectedDate = APselectedDataDatesYear[APindex];
        APdisplayDetailedInfo(APselectedDate);
    }
    APchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            APhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        APchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                APhandleBarClick(event, array);
            }
        };
    }
}

function APfindMaxResult() {
    var APmaxResult = 0;

    fetchedDataArray.forEach(APresultData => {
        var APtimeString = APresultData.apTotalTime;

        // Check if the timeString is not empty before parsing
        if (APtimeString !== undefined && APtimeString !== '' && APtimeString !== null) {
            var seconds = parseTimeToSeconds2(APtimeString);
            APmaxResult = Math.max(APmaxResult, secondsToMinutes(seconds));
        }
    });
    return APmaxResult;
}
function APfindMaxResult2() {
    var APmaxResult = 0;

    fetchedDataArray.forEach(APresultData => {
        var APtimeString = APresultData.apTotalTime;

        // Check if the timeString is not empty before parsing
        if (APtimeString !== undefined && APtimeString !== '' && APtimeString !== null) {
            var seconds = parseTimeToSeconds2(APtimeString);
            APmaxResult = Math.max(APmaxResult, seconds);
        }
    });
    return APmaxResult;
}
function APupdateChartData(APstartDate, APendDate) {
    var APdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var APcurrentDate = new Date(APstartDate);
    while (APcurrentDate <= APendDate) {
        APdateRange.push(new Date(APcurrentDate));
        APcurrentDate.setDate(APcurrentDate.getDate() + 1); // Move to the next day
    }

    var APaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(APresultData => {
        var APresultDate = new Date(APresultData.apResultDate);
        var APseconds;
        var APminutes;
        var APtimeString = APresultData.apTotalTime;
        if (APtimeString !== undefined && APtimeString !== '' && APtimeString !== null) {
            APseconds = parseTimeToSeconds2(APtimeString);
            APminutes = secondsToMinutes(APseconds);
        } else {
            APminutes = 0;
        }
        if (!isNaN(APresultDate.getTime())) {
            var APformattedDate = formatDateAsDMY(APresultDate);

            if (!APaggregatedData[APformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                APaggregatedData[APformattedDate] = { APtotalValue: parseFloat(APminutes) };
            } else {
                // If the date already exists, update the existing entry
                APaggregatedData[APformattedDate].APtotalValue += parseFloat(APminutes);
            }
        }
    });

    var APmaxResult = APfindMaxResult();
    var APchartData = APdateRange.map(APresultDate => {
        var APformattedDate = formatDateAsDMY(APresultDate);
        var APaggregatedDatum = APaggregatedData[APformattedDate];
        return APaggregatedDatum ? APaggregatedDatum.APtotalValue : 0;
    });

    return {
        APchartData: APchartData,
        APmaxYValue: Math.floor(APmaxResult + 2),
        APselectedDataDatesYear: APdateRange.map(formatDateAsDMY)
    };
}
function APupdateChart(APstartDate, APendDate) {
    var { APchartData, APmaxYValue, APselectedDataDatesYear } = APupdateChartData(APstartDate, APendDate);

    // Update x-axis labels and chart data
    var APselectedDataDatesMonthDay = APselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    APchart.data.labels = APselectedDataDatesMonthDay;
    APchart.data.datasets[0].data = APchartData;
    APchart.options.scales.yAxes[0].ticks.max = APmaxYValue;
    function APhandleBarClick(event, array) {
        var APindex = array[0]._index; // Get the clicked bar index
        var APselectedDate = APselectedDataDatesYear[APindex];
        APdisplayDetailedInfo(APselectedDate);
    }
    APchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            APhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        APchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                APhandleBarClick(event, array);
            }
        };
    }
    APchart.update();
}
function APupdateOverview() {
    var APnumberOfTests = 0;
    var APmax = APfindMaxResult();
    var APmax2 = APfindMaxResult2();
    var APinfoOverviewElements = document.getElementsByClassName('APinfoOverview');
    fetchedDataArray.forEach(APresultData => {
        var APtimeString = APresultData.apTotalTime;
        var APdateString = APresultData.apResultDate;
        var AProunds = APresultData.apIntervals;
        // Check if the timeString is not empty before parsing
        if (APtimeString !== undefined && APtimeString !== '' && APtimeString !== null) {
            var APseconds = parseTimeToSeconds2(APtimeString);
            // Store the value of dateOfLongestResult when APmax is updated
            if (APseconds === APmax2) {
                APdateOfLongestResult = APdateString;
                APintervals = AProunds;
            }
            APlatestResult = parseTimeToSeconds2(APtimeString);
            APlastDate = APdateString;
            APlastIntervals = AProunds;
            APnumberOfTests++;
        }
    });
    if (APnumberOfTests !== 0) {
        APinfoOverview.innerHTML = '';
        for (var i = 0; i < APinfoOverviewElements.length; i++) {
            APinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('APContainer').style.display = 'block';
        document.getElementById('APnumberOfSessions').value = APnumberOfTests + ' Sessions';
        document.getElementById('APlongestRound').value = convertMinToMinSec(APmax) + APintervals + ' rounds ' + formatDateAsDMY(APdateOfLongestResult);
        document.getElementById('APlatestRound').value = convertMinToMinSec(secondsToMinutes(APlatestResult)) + APlastIntervals + ' rounds ' + formatDateAsDMY(APlastDate);
    } else {
        APinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < APinfoOverviewElements.length; i++) {
            APinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('APContainer').style.display = 'none';
    }
}
var APresultPage = document.getElementById('APresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    APresultDateHeader = document.getElementById('APresultDateHeader'),
    APresultSessions = document.getElementById('APresultSessions');

function APdisplayDetailedInfo(APselectedDate) {
    function APdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.APdelete-form [name="resultId"][value="' + resultId + '"]').closest('.APdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            APupdateChart(APstartDate, APendDate);
                            APupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var APnumberOfResults = 1;
    APresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(APresultData => {
        var APtimeString = APresultData.apTotalTime;
        var APdateString = APresultData.apResultDate;
        var APresultId = APresultData.resultId;
        APintervals = APresultData.apIntervals;
        // Check if the timeString is not empty before parsing
        if (APtimeString !== undefined && APtimeString !== '' && APtimeString !== null) {
            var APseconds = parseTimeToSeconds2(APtimeString);
            // Store the value of dateOfLongestResult when APmax is updated
            if (APselectedDate === formatDateAsDMY(APdateString)) {
                APresultDateHeader.innerHTML = 'Results on ' + APselectedDate;
                APresultSessions.innerHTML += '<form method="post" class="APdelete-form">' +
                    '<div>Session ' + APnumberOfResults + ' __________</div>' +
                    '<input value="' + convertMinToMinSec(secondsToMinutes(APseconds)) + ' " readonly class="resultInput"/>' +
                    '<input value="' + APintervals + ' rounds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + APresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger APdelete-button" />' +
                    '</form>';
                APnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var APdeleteButtons = document.querySelectorAll('.APdelete-button');
    APdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var APform = this.closest('.APdelete-form');
            var APresultId = APform.querySelector('[name="resultId"]').value;
            APdeleteResult(APresultId);
        });
    });

    openPage(resultsPage, APresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END AP
// CT
// Initialize startDate and endDate
var CTtoday = new Date();
var CTlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var CTresultDate = new Date(CTtoday);
    CTresultDate.setDate(CTtoday.getDate() - i);
    CTlast7Dates.push(CTresultDate); // Push the Date object directly
}

var CTendDate = CTlast7Dates[CTlast7Dates.length - 1]; // Initialize with the latest date
var CTstartDate = CTlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var CTtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var CTContainer = document.getElementById('CTContainer');
CTContainer.addEventListener('touchstart', function (event) {
    CTtouchStartX = event.touches[0].clientX;
});

var CTscrollThreshold = 10; // Adjust this value to control the scroll threshold

var CTlastScrollX = null;
var { CTchartData, CTmaxYValue, CTselectedDataDatesYear } = CTupdateChartData(CTstartDate, CTendDate, fetchedDataArray);
var CTinfoOverview = document.getElementById('CTinfoOverview');
var CTdateOfLongestResult;
var CTlastIntervals;
var CTintervals;
var CTlastDate;
var CTlatestResult;
var CTchart;
function CTinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var CTdateA = new Date(a.CTresultDate);
        var CTdateB = new Date(b.CTresultDate);
        return CTdateA - CTdateB;
    });
    var CTselectedDataDatesMonthDay = CTselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    CTchart = new Chart("CTchart", {
        type: "bar",
        data: {
            labels: CTselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: CTchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your Yogic Breathing results " + "(" + getYear(CTendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        return 'Total Results on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + convertMinToMinSec(Math.round(value * 100) / 100);
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: CTmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    CTContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (CTtouchStartX !== null) {
            var CTtouchMoveX = event.touches[0].clientX;

            if (CTlastScrollX !== null) {
                var CTdelta = CTtouchMoveX - CTlastScrollX;

                if (Math.abs(CTdelta) >= CTscrollThreshold) {
                    CTlastScrollX = CTtouchMoveX;

                    if (CTdelta > 0) {
                        // Scroll right, decrease the date range
                        CTendDate.setDate(CTendDate.getDate() - 1);
                        CTstartDate.setDate(CTstartDate.getDate() - 1);
                        CTchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(CTendDate) + ")";
                    } else if (CTdelta < 0) {
                        if (formatDateAsDMY(CTendDate) == formatDateAsDMY(CTtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            CTendDate.setDate(CTendDate.getDate() + 1);
                            CTstartDate.setDate(CTstartDate.getDate() + 1);
                            CTchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(CTendDate) + ")";
                        }
                    }
                    CTupdateChart(CTstartDate, CTendDate);
                }
            } else {
                CTlastScrollX = CTtouchMoveX;
            }
        }
    });

    CTContainer.addEventListener('touchend', function () {
        CTlastScrollX = null;
    });
    CTContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var CTdelta = event.deltaX * 0.1;

        if (CTdelta < 0) {
            // Scroll left, decrease the date range
            CTendDate.setDate(CTendDate.getDate() - 1);
            CTstartDate.setDate(CTstartDate.getDate() - 1);
            CTchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(CTendDate) + ")";
        } else if (CTdelta > 0) {
            if (formatDateAsDMY(CTendDate) == formatDateAsDMY(CTtoday)) { }
            else {
                // Scroll right, increase the date range
                CTendDate.setDate(CTendDate.getDate() + 1);
                CTstartDate.setDate(CTstartDate.getDate() + 1);
                CTchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(CTendDate) + ")";
            }
        }
        CTupdateChart(CTstartDate, CTendDate);
    });
    CTupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function CThandleBarClick(event, array) {
        var CTindex = array[0]._index; // Get the clicked bar index
        var CTselectedDate = CTselectedDataDatesYear[CTindex];
        CTdisplayDetailedInfo(CTselectedDate);
    }
    CTchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            CThandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        CTchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                CThandleBarClick(event, array);
            }
        };
    }
}

function CTfindMaxResult() {
    var CTmaxResult = 0;

    fetchedDataArray.forEach(CTresultData => {
        var CTtimeString = CTresultData.ctTotalTime;

        // Check if the timeString is not empty before parsing
        if (CTtimeString !== undefined && CTtimeString !== '' && CTtimeString !== null) {
            var seconds = parseTimeToSeconds2(CTtimeString);
            CTmaxResult = Math.max(CTmaxResult, secondsToMinutes(seconds));
        }
    });
    return CTmaxResult;
}
function CTfindMaxResult2() {
    var CTmaxResult = 0;

    fetchedDataArray.forEach(CTresultData => {
        var CTtimeString = CTresultData.ctTotalTime;

        // Check if the timeString is not empty before parsing
        if (CTtimeString !== undefined && CTtimeString !== '' && CTtimeString !== null) {
            var seconds = parseTimeToSeconds2(CTtimeString);
            CTmaxResult = Math.max(CTmaxResult, seconds);
        }
    });
    return CTmaxResult;
}
function CTupdateChartData(CTstartDate, CTendDate) {
    var CTdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var CTcurrentDate = new Date(CTstartDate);
    while (CTcurrentDate <= CTendDate) {
        CTdateRange.push(new Date(CTcurrentDate));
        CTcurrentDate.setDate(CTcurrentDate.getDate() + 1); // Move to the next day
    }

    var CTaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(CTresultData => {
        var CTresultDate = new Date(CTresultData.ctResultDate);
        var CTseconds;
        var CTminutes;
        var CTtimeString = CTresultData.ctTotalTime;
        if (CTtimeString !== undefined && CTtimeString !== '' && CTtimeString !== null) {
            CTseconds = parseTimeToSeconds2(CTtimeString);
            CTminutes = secondsToMinutes(CTseconds);
        } else {
            CTminutes = 0;
        }
        if (!isNaN(CTresultDate.getTime())) {
            var CTformattedDate = formatDateAsDMY(CTresultDate);

            if (!CTaggregatedData[CTformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                CTaggregatedData[CTformattedDate] = { CTtotalValue: parseFloat(CTminutes) };
            } else {
                // If the date already exists, update the existing entry
                CTaggregatedData[CTformattedDate].CTtotalValue += parseFloat(CTminutes);
            }
        }
    });

    var CTmaxResult = CTfindMaxResult();
    var CTchartData = CTdateRange.map(CTresultDate => {
        var CTformattedDate = formatDateAsDMY(CTresultDate);
        var CTaggregatedDatum = CTaggregatedData[CTformattedDate];
        return CTaggregatedDatum ? CTaggregatedDatum.CTtotalValue : 0;
    });

    return {
        CTchartData: CTchartData,
        CTmaxYValue: Math.floor(CTmaxResult + 2),
        CTselectedDataDatesYear: CTdateRange.map(formatDateAsDMY)
    };
}
function CTupdateChart(CTstartDate, CTendDate) {
    var { CTchartData, CTmaxYValue, CTselectedDataDatesYear } = CTupdateChartData(CTstartDate, CTendDate);

    // Update x-axis labels and chart data
    var CTselectedDataDatesMonthDay = CTselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    CTchart.data.labels = CTselectedDataDatesMonthDay;
    CTchart.data.datasets[0].data = CTchartData;
    CTchart.options.scales.yAxes[0].ticks.max = CTmaxYValue;
    function CThandleBarClick(event, array) {
        var CTindex = array[0]._index; // Get the clicked bar index
        var CTselectedDate = CTselectedDataDatesYear[CTindex];
        CTdisplayDetailedInfo(CTselectedDate);
    }
    CTchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            CThandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        CTchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                CThandleBarClick(event, array);
            }
        };
    }
    CTchart.update();
}
function CTupdateOverview() {
    var CTnumberOfTests = 0;
    var CTmax = CTfindMaxResult();
    var CTmax2 = CTfindMaxResult2();
    var CTinfoOverviewElements = document.getElementsByClassName('CTinfoOverview');
    fetchedDataArray.forEach(CTresultData => {
        var CTtimeString = CTresultData.ctTotalTime;
        var CTdateString = CTresultData.ctResultDate;
        var CTrounds = CTresultData.ctIntervals;
        // Check if the timeString is not empty before parsing
        if (CTtimeString !== undefined && CTtimeString !== '' && CTtimeString !== null) {
            var CTseconds = parseTimeToSeconds2(CTtimeString);
            // Store the value of dateOfLongestResult when CTmax is updated
            if (CTseconds === CTmax2) {
                CTdateOfLongestResult = CTdateString;
                CTintervals = CTrounds;
            }
            CTlatestResult = parseTimeToSeconds2(CTtimeString);
            CTlastDate = CTdateString;
            CTlastIntervals = CTrounds;
            CTnumberOfTests++;
        }
    });
    if (CTnumberOfTests !== 0) {
        CTinfoOverview.innerHTML = '';
        for (var i = 0; i < CTinfoOverviewElements.length; i++) {
            CTinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('CTContainer').style.display = 'block';
        document.getElementById('CTnumberOfSessions').value = CTnumberOfTests + ' Sessions';
        document.getElementById('CTlongestRound').value = convertMinToMinSec(CTmax) + CTintervals + ' rounds ' + formatDateAsDMY(CTdateOfLongestResult);
        document.getElementById('CTlatestRound').value = convertMinToMinSec(secondsToMinutes(CTlatestResult)) + CTlastIntervals + ' rounds ' + formatDateAsDMY(CTlastDate);
    } else {
        CTinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < CTinfoOverviewElements.length; i++) {
            CTinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('CTContainer').style.display = 'none';
    }
}
var CTresultPage = document.getElementById('CTresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    CTresultDateHeader = document.getElementById('CTresultDateHeader'),
    CTresultSessions = document.getElementById('CTresultSessions');

function CTdisplayDetailedInfo(CTselectedDate) {
    function CTdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.CTdelete-form [name="resultId"][value="' + resultId + '"]').closest('.CTdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            CTupdateChart(CTstartDate, CTendDate);
                            CTupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var CTnumberOfResults = 1;
    CTresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(CTresultData => {
        var CTtimeString = CTresultData.ctTotalTime;
        var CTdateString = CTresultData.ctResultDate;
        var CTresultId = CTresultData.resultId;
        CTintervals = CTresultData.ctIntervals;
        // Check if the timeString is not empty before parsing
        if (CTtimeString !== undefined && CTtimeString !== '' && CTtimeString !== null) {
            var CTseconds = parseTimeToSeconds2(CTtimeString);
            // Store the value of dateOfLongestResult when CTmax is updated
            if (CTselectedDate === formatDateAsDMY(CTdateString)) {
                CTresultDateHeader.innerHTML = 'Results on ' + CTselectedDate;
                CTresultSessions.innerHTML += '<form method="post" class="CTdelete-form">' +
                    '<div>Session ' + CTnumberOfResults + ' __________</div>' +
                    '<input value="' + convertMinToMinSec(secondsToMinutes(CTseconds)) + ' " readonly class="resultInput"/>' +
                    '<input value="' + CTintervals + ' rounds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + CTresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger CTdelete-button" />' +
                    '</form>';
                CTnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var CTdeleteButtons = document.querySelectorAll('.CTdelete-button');
    CTdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var CTform = this.closest('.CTdelete-form');
            var CTresultId = CTform.querySelector('[name="resultId"]').value;
            CTdeleteResult(CTresultId);
        });
    });

    openPage(resultsPage, CTresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END CT
// BOX
// Initialize startDate and endDate
var BOXtoday = new Date();
var BOXlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var BOXresultDate = new Date(BOXtoday);
    BOXresultDate.setDate(BOXtoday.getDate() - i);
    BOXlast7Dates.push(BOXresultDate); // Push the Date object directly
}

var BOXendDate = BOXlast7Dates[BOXlast7Dates.length - 1]; // Initialize with the latest date
var BOXstartDate = BOXlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var BOXtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var BOXContainer = document.getElementById('BOXContainer');
BOXContainer.addEventListener('touchstart', function (event) {
    BOXtouchStartX = event.touches[0].clientX;
});

var BOXscrollThreshold = 10; // Adjust this value to control the scroll threshold

var BOXlastScrollX = null;
var { BOXchartData, BOXmaxYValue, BOXselectedDataDatesYear } = BOXupdateChartData(BOXstartDate, BOXendDate, fetchedDataArray);
var BOXinfoOverview = document.getElementById('BOXinfoOverview');
var BOXdateOfLongestResult;
var BOXlastIntervals;
var BOXintervals;
var BOXlastDate;
var BOXlatestResult;
var BOXchart;
function BOXinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var BOXdateA = new Date(a.BOXresultDate);
        var BOXdateB = new Date(b.BOXresultDate);
        return BOXdateA - BOXdateB;
    });
    var BOXselectedDataDatesMonthDay = BOXselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    BOXchart = new Chart("BOXchart", {
        type: "bar",
        data: {
            labels: BOXselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: BOXchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your Yogic Breathing results " + "(" + getYear(BOXendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        return 'Total Results on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + convertMinToMinSec(Math.round(value * 100) / 100);
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: BOXmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    BOXContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (BOXtouchStartX !== null) {
            var BOXtouchMoveX = event.touches[0].clientX;

            if (BOXlastScrollX !== null) {
                var BOXdelta = BOXtouchMoveX - BOXlastScrollX;

                if (Math.abs(BOXdelta) >= BOXscrollThreshold) {
                    BOXlastScrollX = BOXtouchMoveX;

                    if (BOXdelta > 0) {
                        // Scroll right, decrease the date range
                        BOXendDate.setDate(BOXendDate.getDate() - 1);
                        BOXstartDate.setDate(BOXstartDate.getDate() - 1);
                        BOXchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(BOXendDate) + ")";
                    } else if (BOXdelta < 0) {
                        if (formatDateAsDMY(BOXendDate) == formatDateAsDMY(BOXtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BOXendDate.setDate(BOXendDate.getDate() + 1);
                            BOXstartDate.setDate(BOXstartDate.getDate() + 1);
                            BOXchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(BOXendDate) + ")";
                        }
                    }
                    BOXupdateChart(BOXstartDate, BOXendDate);
                }
            } else {
                BOXlastScrollX = BOXtouchMoveX;
            }
        }
    });

    BOXContainer.addEventListener('touchend', function () {
        BOXlastScrollX = null;
    });
    BOXContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var BOXdelta = event.deltaX * 0.1;

        if (BOXdelta < 0) {
            // Scroll left, decrease the date range
            BOXendDate.setDate(BOXendDate.getDate() - 1);
            BOXstartDate.setDate(BOXstartDate.getDate() - 1);
            BOXchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(BOXendDate) + ")";
        } else if (BOXdelta > 0) {
            if (formatDateAsDMY(BOXendDate) == formatDateAsDMY(BOXtoday)) { }
            else {
                // Scroll right, increase the date range
                BOXendDate.setDate(BOXendDate.getDate() + 1);
                BOXstartDate.setDate(BOXstartDate.getDate() + 1);
                BOXchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(BOXendDate) + ")";
            }
        }
        BOXupdateChart(BOXstartDate, BOXendDate);
    });
    BOXupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function BOXhandleBarClick(event, array) {
        var BOXindex = array[0]._index; // Get the clicked bar index
        var BOXselectedDate = BOXselectedDataDatesYear[BOXindex];
        BOXdisplayDetailedInfo(BOXselectedDate);
    }
    BOXchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BOXhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BOXchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BOXhandleBarClick(event, array);
            }
        };
    }
}

function BOXfindMaxResult() {
    var BOXmaxResult = 0;

    fetchedDataArray.forEach(BOXresultData => {
        var BOXtimeString = BOXresultData.boxTotalTime;

        // Check if the timeString is not empty before parsing
        if (BOXtimeString !== undefined && BOXtimeString !== '' && BOXtimeString !== null) {
            var seconds = parseTimeToSeconds2(BOXtimeString);
            BOXmaxResult = Math.max(BOXmaxResult, secondsToMinutes(seconds));
        }
    });
    return BOXmaxResult;
}
function BOXfindMaxResult2() {
    var BOXmaxResult = 0;

    fetchedDataArray.forEach(BOXresultData => {
        var BOXtimeString = BOXresultData.boxTotalTime;

        // Check if the timeString is not empty before parsing
        if (BOXtimeString !== undefined && BOXtimeString !== '' && BOXtimeString !== null) {
            var seconds = parseTimeToSeconds2(BOXtimeString);
            BOXmaxResult = Math.max(BOXmaxResult, seconds);
        }
    });
    return BOXmaxResult;
}
function BOXupdateChartData(BOXstartDate, BOXendDate) {
    var BOXdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var BOXcurrentDate = new Date(BOXstartDate);
    while (BOXcurrentDate <= BOXendDate) {
        BOXdateRange.push(new Date(BOXcurrentDate));
        BOXcurrentDate.setDate(BOXcurrentDate.getDate() + 1); // Move to the next day
    }

    var BOXaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(BOXresultData => {
        var BOXresultDate = new Date(BOXresultData.boxResultDate);
        var BOXseconds;
        var BOXminutes;
        var BOXtimeString = BOXresultData.boxTotalTime;
        if (BOXtimeString !== undefined && BOXtimeString !== '' && BOXtimeString !== null) {
            BOXseconds = parseTimeToSeconds2(BOXtimeString);
            BOXminutes = secondsToMinutes(BOXseconds);
        } else {
            BOXminutes = 0;
        }
        if (!isNaN(BOXresultDate.getTime())) {
            var BOXformattedDate = formatDateAsDMY(BOXresultDate);

            if (!BOXaggregatedData[BOXformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                BOXaggregatedData[BOXformattedDate] = { BOXtotalValue: parseFloat(BOXminutes) };
            } else {
                // If the date already exists, update the existing entry
                BOXaggregatedData[BOXformattedDate].BOXtotalValue += parseFloat(BOXminutes);
            }
        }
    });

    var BOXmaxResult = BOXfindMaxResult();
    var BOXchartData = BOXdateRange.map(BOXresultDate => {
        var BOXformattedDate = formatDateAsDMY(BOXresultDate);
        var BOXaggregatedDatum = BOXaggregatedData[BOXformattedDate];
        return BOXaggregatedDatum ? BOXaggregatedDatum.BOXtotalValue : 0;
    });

    return {
        BOXchartData: BOXchartData,
        BOXmaxYValue: Math.floor(BOXmaxResult + 2),
        BOXselectedDataDatesYear: BOXdateRange.map(formatDateAsDMY)
    };
}
function BOXupdateChart(BOXstartDate, BOXendDate) {
    var { BOXchartData, BOXmaxYValue, BOXselectedDataDatesYear } = BOXupdateChartData(BOXstartDate, BOXendDate);

    // Update x-axis labels and chart data
    var BOXselectedDataDatesMonthDay = BOXselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    BOXchart.data.labels = BOXselectedDataDatesMonthDay;
    BOXchart.data.datasets[0].data = BOXchartData;
    BOXchart.options.scales.yAxes[0].ticks.max = BOXmaxYValue;
    function BOXhandleBarClick(event, array) {
        var BOXindex = array[0]._index; // Get the clicked bar index
        var BOXselectedDate = BOXselectedDataDatesYear[BOXindex];
        BOXdisplayDetailedInfo(BOXselectedDate);
    }
    BOXchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            BOXhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        BOXchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                BOXhandleBarClick(event, array);
            }
        };
    }
    BOXchart.update();
}
function BOXupdateOverview() {
    var BOXnumberOfTests = 0;
    var BOXmax = BOXfindMaxResult();
    var BOXmax2 = BOXfindMaxResult2();
    var BOXinfoOverviewElements = document.getElementsByClassName('BOXinfoOverview');
    fetchedDataArray.forEach(BOXresultData => {
        var BOXtimeString = BOXresultData.boxTotalTime;
        var BOXdateString = BOXresultData.boxResultDate;
        var BOXrounds = BOXresultData.boxIntervals;
        // Check if the timeString is not empty before parsing
        if (BOXtimeString !== undefined && BOXtimeString !== '' && BOXtimeString !== null) {
            var BOXseconds = parseTimeToSeconds2(BOXtimeString);
            // Store the value of dateOfLongestResult when BOXmax is updated
            if (BOXseconds === BOXmax2) {
                BOXdateOfLongestResult = BOXdateString;
                BOXintervals = BOXrounds;
            }
            BOXlatestResult = parseTimeToSeconds2(BOXtimeString);
            BOXlastDate = BOXdateString;
            BOXlastIntervals = BOXrounds;
            BOXnumberOfTests++;
        }
    });
    if (BOXnumberOfTests !== 0) {
        BOXinfoOverview.innerHTML = '';
        for (var i = 0; i < BOXinfoOverviewElements.length; i++) {
            BOXinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('BOXContainer').style.display = 'block';
        document.getElementById('BOXnumberOfSessions').value = BOXnumberOfTests + ' Sessions';
        document.getElementById('BOXlongestRound').value = convertMinToMinSec(BOXmax) + BOXintervals + ' rounds ' + formatDateAsDMY(BOXdateOfLongestResult);
        document.getElementById('BOXlatestRound').value = convertMinToMinSec(secondsToMinutes(BOXlatestResult)) + BOXlastIntervals + ' rounds ' + formatDateAsDMY(BOXlastDate);
    } else {
        BOXinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < BOXinfoOverviewElements.length; i++) {
            BOXinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('BOXContainer').style.display = 'none';
    }
}
var BOXresultPage = document.getElementById('BOXresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    BOXresultDateHeader = document.getElementById('BOXresultDateHeader'),
    BOXresultSessions = document.getElementById('BOXresultSessions');

function BOXdisplayDetailedInfo(BOXselectedDate) {
    function BOXdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.BOXdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BOXdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BOXupdateChart(BOXstartDate, BOXendDate);
                            BOXupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var BOXnumberOfResults = 1;
    BOXresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(BOXresultData => {
        var BOXtimeString = BOXresultData.boxTotalTime;
        var BOXdateString = BOXresultData.boxResultDate;
        var BOXresultId = BOXresultData.resultId;
        BOXintervals = BOXresultData.boxIntervals;
        // Check if the timeString is not empty before parsing
        if (BOXtimeString !== undefined && BOXtimeString !== '' && BOXtimeString !== null) {
            var BOXseconds = parseTimeToSeconds2(BOXtimeString);
            // Store the value of dateOfLongestResult when BOXmax is updated
            if (BOXselectedDate === formatDateAsDMY(BOXdateString)) {
                BOXresultDateHeader.innerHTML = 'Results on ' + BOXselectedDate;
                BOXresultSessions.innerHTML += '<form method="post" class="BOXdelete-form">' +
                    '<div>Session ' + BOXnumberOfResults + ' __________</div>' +
                    '<input value="' + convertMinToMinSec(secondsToMinutes(BOXseconds)) + ' " readonly class="resultInput"/>' +
                    '<input value="' + BOXintervals + ' rounds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + BOXresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger BOXdelete-button" />' +
                    '</form>';
                BOXnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var BOXdeleteButtons = document.querySelectorAll('.BOXdelete-button');
    BOXdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var BOXform = this.closest('.BOXdelete-form');
            var BOXresultId = BOXform.querySelector('[name="resultId"]').value;
            BOXdeleteResult(BOXresultId);
        });
    });

    openPage(resultsPage, BOXresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END BOX
// UB
// Initialize startDate and endDate
var UBtoday = new Date();
var UBlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var UBresultDate = new Date(UBtoday);
    UBresultDate.setDate(UBtoday.getDate() - i);
    UBlast7Dates.push(UBresultDate); // Push the Date object directly
}

var UBendDate = UBlast7Dates[UBlast7Dates.length - 1]; // Initialize with the latest date
var UBstartDate = UBlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var UBtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var UBContainer = document.getElementById('UBContainer');
UBContainer.addEventListener('touchstart', function (event) {
    UBtouchStartX = event.touches[0].clientX;
});

var UBscrollThreshold = 10; // Adjust this value to control the scroll threshold

var UBlastScrollX = null;
var { UBchartData, UBmaxYValue, UBselectedDataDatesYear } = UBupdateChartData(UBstartDate, UBendDate, fetchedDataArray);
var UBinfoOverview = document.getElementById('UBinfoOverview');
var UBdateOfLongestResult;
var UBlastIntervals;
var UBintervals;
var UBlastDate;
var UBlatestResult;
var UBchart;
function UBinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var UBdateA = new Date(a.UBresultDate);
        var UBdateB = new Date(b.UBresultDate);
        return UBdateA - UBdateB;
    });
    var UBselectedDataDatesMonthDay = UBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    // Initialize chart using initial dates
    UBchart = new Chart("UBchart", {
        type: "bar",
        data: {
            labels: UBselectedDataDatesMonthDay,
            datasets: [{
                backgroundColor: '#49B79D',
                data: UBchartData,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            }]
        },
        options: {
            legend: { display: false }, // Display the legend
            title: {
                display: true,
                text: "Your Yogic Breathing results " + "(" + getYear(UBendDate) + ")",
                font: {
                    family: 'Playfair Display', // Change to your desired font family
                    size: 14 // Change to your desired font size
                },
                fontColor: '#0661AA', // Change to your desired font color
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems, data) {
                        return 'Total Results on';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + convertMinToMinSec(Math.round(value * 100) / 100);
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: UBmaxYValue,
                        stepSize: 10,
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
                            family: 'Playfair Display', // Change to your desired font family
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    UBContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (UBtouchStartX !== null) {
            var UBtouchMoveX = event.touches[0].clientX;

            if (UBlastScrollX !== null) {
                var UBdelta = UBtouchMoveX - UBlastScrollX;

                if (Math.abs(UBdelta) >= UBscrollThreshold) {
                    UBlastScrollX = UBtouchMoveX;

                    if (UBdelta > 0) {
                        // Scroll right, decrease the date range
                        UBendDate.setDate(UBendDate.getDate() - 1);
                        UBstartDate.setDate(UBstartDate.getDate() - 1);
                        UBchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(UBendDate) + ")";
                    } else if (UBdelta < 0) {
                        if (formatDateAsDMY(UBendDate) == formatDateAsDMY(UBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            UBendDate.setDate(UBendDate.getDate() + 1);
                            UBstartDate.setDate(UBstartDate.getDate() + 1);
                            UBchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(UBendDate) + ")";
                        }
                    }
                    UBupdateChart(UBstartDate, UBendDate);
                }
            } else {
                UBlastScrollX = UBtouchMoveX;
            }
        }
    });

    UBContainer.addEventListener('touchend', function () {
        UBlastScrollX = null;
    });
    UBContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var UBdelta = event.deltaX * 0.1;

        if (UBdelta < 0) {
            // Scroll left, decrease the date range
            UBendDate.setDate(UBendDate.getDate() - 1);
            UBstartDate.setDate(UBstartDate.getDate() - 1);
            UBchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(UBendDate) + ")";
        } else if (UBdelta > 0) {
            if (formatDateAsDMY(UBendDate) == formatDateAsDMY(UBtoday)) { }
            else {
                // Scroll right, increase the date range
                UBendDate.setDate(UBendDate.getDate() + 1);
                UBstartDate.setDate(UBstartDate.getDate() + 1);
                UBchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(UBendDate) + ")";
            }
        }
        UBupdateChart(UBstartDate, UBendDate);
    });
    UBupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function UBhandleBarClick(event, array) {
        var UBindex = array[0]._index; // Get the clicked bar index
        var UBselectedDate = UBselectedDataDatesYear[UBindex];
        UBdisplayDetailedInfo(UBselectedDate);
    }
    UBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            UBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        UBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                UBhandleBarClick(event, array);
            }
        };
    }
}

function UBfindMaxResult() {
    var UBmaxResult = 0;

    fetchedDataArray.forEach(UBresultData => {
        var UBtimeString = UBresultData.ubTotalTime;

        // Check if the timeString is not empty before parsing
        if (UBtimeString !== undefined && UBtimeString !== '' && UBtimeString !== null) {
            var seconds = parseTimeToSeconds2(UBtimeString);
            UBmaxResult = Math.max(UBmaxResult, secondsToMinutes(seconds));
        }
    });
    return UBmaxResult;
}
function UBfindMaxResult2() {
    var UBmaxResult = 0;

    fetchedDataArray.forEach(UBresultData => {
        var UBtimeString = UBresultData.ubTotalTime;

        // Check if the timeString is not empty before parsing
        if (UBtimeString !== undefined && UBtimeString !== '' && UBtimeString !== null) {
            var seconds = parseTimeToSeconds2(UBtimeString);
            UBmaxResult = Math.max(UBmaxResult, seconds);
        }
    });
    return UBmaxResult;
}
function UBupdateChartData(UBstartDate, UBendDate) {
    var UBdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var UBcurrentDate = new Date(UBstartDate);
    while (UBcurrentDate <= UBendDate) {
        UBdateRange.push(new Date(UBcurrentDate));
        UBcurrentDate.setDate(UBcurrentDate.getDate() + 1); // Move to the next day
    }

    var UBaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(UBresultData => {
        var UBresultDate = new Date(UBresultData.ubResultDate);
        var UBseconds;
        var UBminutes;
        var UBtimeString = UBresultData.ubTotalTime;
        if (UBtimeString !== undefined && UBtimeString !== '' && UBtimeString !== null) {
            UBseconds = parseTimeToSeconds2(UBtimeString);
            UBminutes = secondsToMinutes(UBseconds);
        } else {
            UBminutes = 0;
        }
        if (!isNaN(UBresultDate.getTime())) {
            var UBformattedDate = formatDateAsDMY(UBresultDate);

            if (!UBaggregatedData[UBformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                UBaggregatedData[UBformattedDate] = { UBtotalValue: parseFloat(UBminutes) };
            } else {
                // If the date already exists, update the existing entry
                UBaggregatedData[UBformattedDate].UBtotalValue += parseFloat(UBminutes);
            }
        }
    });

    var UBmaxResult = UBfindMaxResult();
    var UBchartData = UBdateRange.map(UBresultDate => {
        var UBformattedDate = formatDateAsDMY(UBresultDate);
        var UBaggregatedDatum = UBaggregatedData[UBformattedDate];
        return UBaggregatedDatum ? UBaggregatedDatum.UBtotalValue : 0;
    });

    return {
        UBchartData: UBchartData,
        UBmaxYValue: Math.floor(UBmaxResult + 2),
        UBselectedDataDatesYear: UBdateRange.map(formatDateAsDMY)
    };
}
function UBupdateChart(UBstartDate, UBendDate) {
    var { UBchartData, UBmaxYValue, UBselectedDataDatesYear } = UBupdateChartData(UBstartDate, UBendDate);

    // Update x-axis labels and chart data
    var UBselectedDataDatesMonthDay = UBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    UBchart.data.labels = UBselectedDataDatesMonthDay;
    UBchart.data.datasets[0].data = UBchartData;
    UBchart.options.scales.yAxes[0].ticks.max = UBmaxYValue;
    function UBhandleBarClick(event, array) {
        var UBindex = array[0]._index; // Get the clicked bar index
        var UBselectedDate = UBselectedDataDatesYear[UBindex];
        UBdisplayDetailedInfo(UBselectedDate);
    }
    UBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            UBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        UBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                UBhandleBarClick(event, array);
            }
        };
    }
    UBchart.update();
}
function UBupdateOverview() {
    var UBnumberOfTests = 0;
    var UBmax = UBfindMaxResult();
    var UBmax2 = UBfindMaxResult2();
    var UBinfoOverviewElements = document.getElementsByClassName('UBinfoOverview');
    fetchedDataArray.forEach(UBresultData => {
        var UBtimeString = UBresultData.ubTotalTime;
        var UBdateString = UBresultData.ubResultDate;
        var UBrounds = UBresultData.ubIntervals;
        // Check if the timeString is not empty before parsing
        if (UBtimeString !== undefined && UBtimeString !== '' && UBtimeString !== null) {
            var UBseconds = parseTimeToSeconds2(UBtimeString);
            // Store the value of dateOfLongestResult when UBmax is updated
            if (UBseconds === UBmax2) {
                UBdateOfLongestResult = UBdateString;
                UBintervals = UBrounds;
            }
            UBlatestResult = parseTimeToSeconds2(UBtimeString);
            UBlastDate = UBdateString;
            UBlastIntervals = UBrounds;
            UBnumberOfTests++;
        }
    });
    if (UBnumberOfTests !== 0) {
        UBinfoOverview.innerHTML = '';
        for (var i = 0; i < UBinfoOverviewElements.length; i++) {
            UBinfoOverviewElements[i].style.display = 'inline-flex';
        }
        document.getElementById('UBContainer').style.display = 'block';
        document.getElementById('UBnumberOfSessions').value = UBnumberOfTests + ' Sessions';
        document.getElementById('UBlongestRound').value = convertMinToMinSec(UBmax) + UBintervals + ' rounds ' + formatDateAsDMY(UBdateOfLongestResult);
        document.getElementById('UBlatestRound').value = convertMinToMinSec(secondsToMinutes(UBlatestResult)) + UBlastIntervals + ' rounds ' + formatDateAsDMY(UBlastDate);
    } else {
        UBinfoOverview.innerHTML = 'No results yet';
        for (var i = 0; i < UBinfoOverviewElements.length; i++) {
            UBinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('UBContainer').style.display = 'none';
    }
}
var UBresultPage = document.getElementById('UBresultPage'),
    resultsPage = document.getElementById("resultsPage"),
    UBresultDateHeader = document.getElementById('UBresultDateHeader'),
    UBresultSessions = document.getElementById('UBresultSessions');

function UBdisplayDetailedInfo(UBselectedDate) {
    function UBdeleteResult(resultId) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/?handler=Delete",
            type: 'POST',
            data: {
                resultId: resultId,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (response) {
                if (response.success) {
                    console.log("Result deleted successfully");
                    // Remove the deleted form
                    $('.UBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.UBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            UBupdateChart(UBstartDate, UBendDate);
                            UBupdateOverview();
                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                } else {
                    console.error("Failed to delete result");
                }
            },
            error: function (error) {
                console.error("Error deleting result:", error);
            }
        });
    }
    var UBnumberOfResults = 1;
    UBresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(UBresultData => {
        var UBtimeString = UBresultData.ubTotalTime;
        var UBdateString = UBresultData.ubResultDate;
        var UBresultId = UBresultData.resultId;
        UBintervals = UBresultData.ubIntervals;
        // Check if the timeString is not empty before parsing
        if (UBtimeString !== undefined && UBtimeString !== '' && UBtimeString !== null) {
            var UBseconds = parseTimeToSeconds2(UBtimeString);
            // Store the value of dateOfLongestResult when UBmax is updated
            if (UBselectedDate === formatDateAsDMY(UBdateString)) {
                UBresultDateHeader.innerHTML = 'Results on ' + UBselectedDate;
                UBresultSessions.innerHTML += '<form method="post" class="UBdelete-form">' +
                    '<div>Session ' + UBnumberOfResults + ' __________</div>' +
                    '<input value="' + convertMinToMinSec(secondsToMinutes(UBseconds)) + ' " readonly class="resultInput"/>' +
                    '<input value="' + UBintervals + ' rounds" readonly class="resultInput"/>' +
                    '<input name="resultId" value="' + UBresultId + '" style="display:none"/>' +
                    '<input type="button" value="Delete" class="btn btn-danger UBdelete-button" />' +
                    '</form>';
                UBnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var UBdeleteButtons = document.querySelectorAll('.UBdelete-button');
    UBdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var UBform = this.closest('.UBdelete-form');
            var UBresultId = UBform.querySelector('[name="resultId"]').value;
            UBdeleteResult(UBresultId);
        });
    });

    openPage(resultsPage, UBresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// END UB