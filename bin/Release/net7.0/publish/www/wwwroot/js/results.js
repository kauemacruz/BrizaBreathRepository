var fetchedDataArray = [];
$.ajax({
    url: "/?fetchData=true",
    type: 'GET',
    success: function (data) {
        fetchedDataArray = data;
        // Call a function to initialize the charts here
        BRTinitializeChart();
        YBinitializeChart();
        BREinitializeChart();
        BRWinitializeChart();
        HUMinitializeChart();
        BBinitializeChart();
        APinitializeChart();
        CTinitializeChart();
        BOXinitializeChart();
        UBinitializeChart();
        NBinitializeChart();
        SBinitializeChart();
        RBinitializeChart();
        CBinitializeChart();
        WHinitializeChart();
        KBinitializeChart();
        HATinitializeChart();
        HATCinitializeChart();
        AHATinitializeChart();
        CO2initializeChart();
        O2initializeChart();
    },
    error: function (error) {
        console.error("Error fetching data:", error);
    }
});
const myModalResults = document.getElementById("myModalResults");
const closeModalResultsBTN = document.getElementById("closeModalResultsBTN");
// Function to open the modal
function openModalResults() {
    myModalResults.style.display = "block";
}

// Function to close the modal
function closeModalResults() {
    myModalResults.style.display = "none";
    document.getElementById("BRTaccordion").style.display = 'none';
    document.getElementById("BPaccordion").style.display = 'none';
    document.getElementById("BHaccordion").style.display = 'none';
    document.getElementById("PRANAaccordion").style.display = 'none';

}

// Event listener for closing the modal
closeModalResultsBTN.addEventListener("click", closeModalResults);

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", function (event) {
    if (event.target === myModalResults) {
        closeModalResults();
    }
});
brtLinkResults.onclick = function () { 
    openModalResults();
    document.getElementById("BRTaccordion").style.display = 'flex';
}
programLinkResults.onclick = function () {
    openModalResults();
    document.getElementById("BPaccordion").style.display = 'flex';
    if (YBnumberOfTests == 0 && BREnumberOfTests == 0 && BRWnumberOfTests == 0 && BBnumberOfTests == 0 && HATnumberOfTests == 0 && HATCnumberOfTests == 0 && AHATnumberOfTests == 0) {
        document.getElementById("BPNoResults").style.display = 'block';
    } else {
        document.getElementById("BPNoResults").style.display = 'none';
    }
}
breathHoldsLinkResults.onclick = function () {
    openModalResults();
    document.getElementById("BHaccordion").style.display = 'flex';
    if (APnumberOfTests == 0 && CTnumberOfTests == 0 && WHnumberOfTests == 0 && O2numberOfTests == 0 && CO2numberOfTests == 0) {
        document.getElementById("BHNoResults").style.display = 'block';
    } else {
        document.getElementById("BHNoResults").style.display = 'none';
    }
}
pranayamaLinkResults.onclick = function () {
    openModalResults();
    document.getElementById("PRANAaccordion").style.display = 'flex';
    if (UBnumberOfTests == 0 && KBnumberOfTests == 0 && BOXnumberOfTests == 0 && NBnumberOfTests == 0 && SBnumberOfTests == 0 && CBnumberOfTests == 0 && RBnumberOfTests == 0 && HUMnumberOfTests == 0) {
        document.getElementById("PRANANoResults").style.display = 'block';
    } else {
        document.getElementById("PRANANoResults").style.display = 'none';
    }
}

//accordion function
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
var resultsPage = document.getElementById("resultsPage");
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
    if (isPortuguese) {
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
                    text: "Seus resultados de TRB em segundos " + "(" + getYear(BRTendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            // Customize the tooltip title here (e.g., return 'Custom Title')
                            return 'Media do dia';
                        },
                        label: function (tooltipItem, data) {
                            var label = data.labels[tooltipItem.index];
                            var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            // Customize the tooltip label format here (e.g., return 'Label: Value')
                            return label + ': ' + Math.round(value * 100) / 100 + ' segundos';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }

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
                        if (isPortuguese) {
                            BRTchart.options.title.text = "Seus resultados de TRB em segundos " + "(" + getYear(BRTendDate) + ")";
                        } else {
                            BRTchart.options.title.text = "Your BRT results in seconds " + "(" + getYear(BRTendDate) + ")";
                        }
                    } else if (BRTdelta < 0) {
                        if (formatDateAsDMY(BRTendDate) == formatDateAsDMY(BRTtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BRTendDate.setDate(BRTendDate.getDate() + 1);
                            BRTstartDate.setDate(BRTstartDate.getDate() + 1);
                            if (isPortuguese) {
                                BRTchart.options.title.text = "Seus resultados de TRB em segundos " + "(" + getYear(BRTendDate) + ")";
                            } else {
                                BRTchart.options.title.text = "Your BRT results in seconds " + "(" + getYear(BRTendDate) + ")";
                            }
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
            if (isPortuguese) {
                BRTchart.options.title.text = "Seus resultados de TRB em segundos " + "(" + getYear(BRTendDate) + ")";
            } else {
                BRTchart.options.title.text = "Your BRT results in seconds " + "(" + getYear(BRTendDate) + ")";
            }
        } else if (BRTdelta > 0) {
            if (formatDateAsDMY(BRTendDate) == formatDateAsDMY(BRTtoday)) { }
            else {
                // Scroll right, increase the date range
                BRTendDate.setDate(BRTendDate.getDate() + 1);
                BRTstartDate.setDate(BRTstartDate.getDate() + 1);
                if (isPortuguese) {
                    BRTchart.options.title.text = "Seus resultados de TRB em segundos " + "(" + getYear(BRTendDate) + ")";
                } else {
                    BRTchart.options.title.text = "Your BRT results in seconds " + "(" + getYear(BRTendDate) + ")";
                }
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
    var personalTraining = document.getElementById("personalizedBriza");
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
    if (isPortuguese) {
        if (BRTnumberOfTests >= 1) {
            var BRTinnerText = '';
            for (var i = 0; i < BRTinfoOverviewElements.length; i++) {
                BRTinfoOverviewElements[i].style.display = 'inline-flex';
            }
            document.getElementById('BRTContainer').style.display = 'block';
            if (BRTlatestResult <= 15) {
                BRTinnerText = 'Com base no seu \u00FAltimo teste (' + BRTlatestResult + ' segundos), parece que sua resist\u00EAncia ao CO2 \u00E9 muito baixa.<br>';
                BRTinnerText += '<br>Voc\u00EA pode ter dificuldades para ter uma boa noite de sono, respira\u00E7\u00E3o pela boca frequente, acordar com a boca seca, bocejar frequentemente e baixos n\u00EDveis de energia durante o dia.<br>';
                BRTinnerText += '<br>\u00C9 recomendado que voc\u00EA se concentre em estabelecer uma rotina do Programa Briza para melhorar sua aptid\u00E3o f\u00EDsica e bem-estar.';
                BRTinfoOverview.innerHTML = BRTinnerText;
                personalTraining.innerHTML = "";
                personalTraining.innerHTML += '<div class="breathingpages">' +
                    '<h2>Seu resultado de teste de reten\u00E7\u00E3o \u00E9: </h2>' +
                    '<h2>' + BRTlatestResult + ' segundos</h2>' +
                    '<p> Rotina para melhorar sua efici\u00EAncia respirat\u00F3ria</p> ' +
                    '<div class="BHGrid"> ' +
                    '<div class="row g-2">' +
                    '<p>Todo dia</p>' +
                    '<div class="col"><a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brt2PT.svg" /></a></div>' +
                    '<div class="col"><a id="YBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/yogicPT.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="BBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brizabreathingPT.svg" /></a></div>' +
                    '<div class="col"><a></a></div>' +
                    '<div class="w-100"></div>' +
                    '<p>Pelo menos 3 vezes por semana</p>' +
                    '<div class="col"><a id="BRELink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverysitPT.svg" /></a></div>' +
                    '<div class="col"><a id="BRWLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverywalkingPT.svg" /></a></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="brizaprogram">' +
                    '<p class="atention"> N\u00C3O force-se al\u00E9m dos seus limites. Se voc\u00EA tiver alguma condi\u00E7\u00E3o de sa\u00FAde grave, para garantir que esses exerc\u00EDcios respirat\u00F3rios sejam seguros para voc\u00EA, consulte um m\u00E9dico antes de praticar qualquer um dos exerc\u00EDcios do aplicativo Briza Breath & Performance</p>' +
                    '</div>';
                document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                    var targetElement = event.target;

                    // If the target is an image inside the link, get the parent element
                    if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                        targetElement = targetElement.parentElement;
                    }

                    var elementId = targetElement.id;

                    switch (elementId) {
                        case 'YBLink':
                            openPage(programPage, YBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backYB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.exhale.load();
                            audioObjects.inhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BRELink':
                            openPage(programPage, BREPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRE.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BRWLink':
                            openPage(programPage, BRWPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRW.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'brtLink2':
                            openPage(programPage, brtPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.bell.load();
                            break;
                        case 'BBLink':
                            openPage(programPage, BBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                    }
                });
            } else if (BRTlatestResult >= 15 && BRTlatestResult <= 25) {
                BRTinnerText = 'Com base no seu \u00FAltimo teste (' + BRTlatestResult + ' segundos), sua resili\u00EAncia ao CO2 \u00E9 relativamente boa.<br>';
                BRTinnerText += '<br>Provavelmente voc\u00EA est\u00E1 respirando principalmente pelo nariz na maior parte do tempo e desfrutando de um sono tranquilo. Seus n\u00EDveis de energia e concentra\u00E7\u00E3o s\u00E3o geralmente satisfat\u00F3rios.<br>';
                BRTinnerText += '<br> \u00C9 recomendado que voc\u00EA estabele\u00E7a uma rotina do Programa Briza para melhorar a efici\u00EAncia da sua respira\u00E7\u00E3o e obter melhores resultados.';
                BRTinfoOverview.innerHTML = BRTinnerText;
                personalTraining.innerHTML = "";
                personalTraining.innerHTML += '<div class="breathingpages">' +
                    '<h2>Seu resultado de teste de reten\u00E7\u00E3o \u00E9: </h2>' +
                    '<h2>' + BRTlatestResult + ' segundos</h2>' +
                    '<p> Rotina para melhorar sua efici\u00EAncia respirat\u00F3ria</p> ' +
                    '<div class="BHGrid"> ' +
                    '<div class="row g-2">' +
                    '<p>Todo dia</p>' +
                    '<div class="col"><a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brt2PT.svg" /></a></div>' +
                    '<div class="col"><a id="BBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brizabreathingPT.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="YBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/yogicPT.svg" /></a></div>' +
                    '<div class="col"><a id="BRWLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverywalkingPT.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<p>Pelo menos 2 vezes por semana</p>' +
                    '<div class="col"><a id="HATLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/hatPT.svg" /></a></div>' +
                    '<div class="col"><a id="WHLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/guiadahiper2.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="lungsLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/expansaopulmonar2.svg"></a></div>' +
                    '<div class="col"><a></a></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="brizaprogram">' +
                    '<p class="atention"> N\u00C3O force-se al\u00E9m dos seus limites. Se voc\u00EA tiver alguma condi\u00E7\u00E3o de sa\u00FAde grave, para garantir que esses exerc\u00EDcios respirat\u00F3rios sejam seguros para voc\u00EA, consulte um m\u00E9dico antes de praticar qualquer um dos exerc\u00EDcios do aplicativo Briza Breath & Performance</p>' +
                    '</div>';
                document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                    var targetElement = event.target;

                    // If the target is an image inside the link, get the parent element
                    if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                        targetElement = targetElement.parentElement;
                    }

                    var elementId = targetElement.id;

                    switch (elementId) {
                        case 'YBLink':
                            openPage(programPage, YBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backYB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.exhale.load();
                            audioObjects.inhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BRWLink':
                            openPage(programPage, BRWPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRW.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BBLink':
                            openPage(programPage, BBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'brtLink2':
                            openPage(programPage, brtPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.bell.load();
                            break;
                        case 'lungsLink2':
                            openPage(programPage, lungsPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backLungs.style.display = "block";
                            backProgram.style.display = "none";
                            break;
                        case 'HATLink':
                            openPage(programPage, HATPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHAT.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchWalk.load();
                            audioObjects.lightNasal.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'WHLink2':
                            openPage(programPage, WHPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backWH2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.fullyin.load();
                            audioObjects.fullyout.load();
                            audioObjects.letgoandhold.load();
                            audioObjects.fullyinHold.load();
                            audioObjects.normalbreath.load();
                            audioObjects.nextRound.load();
                            break;
                    }
                });
            } else if (BRTlatestResult >= 25 && BRTlatestResult <= 35) {
                BRTinnerText = 'Com base no seu \u00FAltimo teste (' + BRTlatestResult + ' segundos), sua resili\u00EAncia ao CO2 \u00E9 excelente.<br>';
                BRTinnerText += '<br>Voc\u00EA provavelmente est\u00E1 experimentando os benef\u00EDcios de uma respira\u00E7\u00E3o eficiente, incluindo sono restaurador, altos n\u00EDveis de energia e boa concentra\u00E7\u00E3o.<br>';
                BRTinnerText += '<br>\u00C9 recomendado que voc\u00EA estabele\u00E7a uma rotina do Programa Briza para alcan\u00E7ar resultados ainda melhores e se sentir ilimitado.';
                BRTinfoOverview.innerHTML = BRTinnerText;
                personalTraining.innerHTML = "";
                personalTraining.innerHTML += '<div class="breathingpages">' +
                    '<h2>Seu resultado de teste de reten\u00E7\u00E3o \u00E9: </h2>' +
                    '<h2>' + BRTlatestResult + ' segundos</h2>' +
                    '<p> Rotina para melhorar sua efici\u00EAncia respirat\u00F3ria</p> ' +
                    '<div class="BHGrid"> ' +
                    '<div class="row g-2">' +
                    '<p>Todo dia</p>' +
                    '<div class="col"><a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brt2PT.svg" /></a></div>' +
                    '<div class="col"><a id="BBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brizabreathingPT.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="BRWLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverywalkingPT.svg" /></a></div>' +
                    '<div class="col"><a id="HATLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/hatPT.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<p>Pelo menos 3 vezes por semana</p>' +
                    '<div class="col"><a id="CTLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/tolerancia2.svg"></a></div>' +
                    '<div class="col"><a id="WHLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/guiadahiper2.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="lungsLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/expansaopulmonar2.svg"></a></div>' +
                    '<div class="col"><a></a></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="brizaprogram">' +
                    '<p class="atention"> N\u00C3O force-se al\u00E9m dos seus limites. Se voc\u00EA tiver alguma condi\u00E7\u00E3o de sa\u00FAde grave, para garantir que esses exerc\u00EDcios respirat\u00F3rios sejam seguros para voc\u00EA, consulte um m\u00E9dico antes de praticar qualquer um dos exerc\u00EDcios do aplicativo Briza Breath & Performance</p>' +
                    '</div>';
                document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                    var targetElement = event.target;

                    // If the target is an image inside the link, get the parent element
                    if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                        targetElement = targetElement.parentElement;
                    }

                    var elementId = targetElement.id;

                    switch (elementId) {
                        case 'WHLink2':
                            openPage(programPage, WHPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backWH2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.fullyin.load();
                            audioObjects.fullyout.load();
                            audioObjects.letgoandhold.load();
                            audioObjects.fullyinHold.load();
                            audioObjects.normalbreath.load();
                            audioObjects.nextRound.load();
                            break;
                        case 'BRWLink':
                            openPage(programPage, BRWPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRW.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BBLink':
                            openPage(programPage, BBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'brtLink2':
                            openPage(programPage, brtPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.bell.load();
                            break;
                        case 'lungsLink2':
                            openPage(programPage, lungsPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backLungs.style.display = "block";
                            backProgram.style.display = "none";
                            break;
                        case 'CTLink2':
                            openPage(programPage, CTPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backCT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.exhale.load();
                            audioObjects.inhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'HATLink':
                            openPage(programPage, HATPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHAT.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchWalk.load();
                            audioObjects.lightNasal.load();
                            audioObjects.normalbreath.load();
                            break;
                    }
                });
            } else if (BRTlatestResult > 35) {
                BRTinnerText = 'Com base no seu \u00FAltimo teste (' + BRTlatestResult + ' segundos), sua resili\u00EAncia ao CO2 \u00E9 excelente.<br>';
                BRTinnerText += '<br>Voc\u00EA provavelmente est\u00E1 experimentando os benef\u00EDcios de uma respira\u00E7\u00E3o eficiente, incluindo sono restaurador, altos n\u00EDveis de energia e grande concentra\u00E7\u00E3o.<br>';
                BRTinnerText += 'Certifique-se de manter os bons resultados mantendo uma rotina do Programa Briza. Use o aplicativo para salvar seus resultados e acompanhar seu progresso.';
                BRTinfoOverview.innerHTML = BRTinnerText;
                personalTraining.innerHTML = "";
                personalTraining.innerHTML += '<div class="breathingpages">' +
                    '<h2>Seu resultado de teste de reten\u00E7\u00E3o \u00E9: </h2>' +
                    '<h2>' + BRTlatestResult + ' segundos</h2>' +
                    '<p> Rotina para melhorar sua efici\u00EAncia respirat\u00F3ria</p> ' +
                    '<div class="BHGrid"> ' +
                    '<div class="row g-2">' +
                    '<p>Todo dia</p>' +
                    '<div class="col"><a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brt2PT.svg" /></a></div>' +
                    '<div class="col"><a id="BBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brizabreathingPT.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="BRWLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverywalkingPT.svg" /></a></div>' +
                    '<div class="col"><a id="CTLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/tolerancia2.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<p>Pelo menos 3 vezes por semana</p>' +
                    '<div class="col"><a id="HATCLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/hatcyclingPT.svg" /></a></div>' +
                    '<div class="col"><a id="AHATLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/advancedhatPT.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="lungsLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/expansaopulmonar2.svg"></a></div>' +
                    '<div class="col"><a id="WHLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/guiadahiper2.svg"></a></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="brizaprogram">' +
                    '<p class="atention"> N\u00C3O force-se al\u00E9m dos seus limites. Se voc\u00EA tiver alguma condi\u00E7\u00E3o de sa\u00FAde grave, para garantir que esses exerc\u00EDcios respirat\u00F3rios sejam seguros para voc\u00EA, consulte um m\u00E9dico antes de praticar qualquer um dos exerc\u00EDcios do aplicativo Briza Breath & Performance</p>' +
                    '</div>';
                document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                    var targetElement = event.target;

                    // If the target is an image inside the link, get the parent element
                    if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                        targetElement = targetElement.parentElement;
                    }

                    var elementId = targetElement.id;

                    switch (elementId) {
                         case 'WHLink2':
                            openPage(programPage, WHPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backWH2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.fullyin.load();
                            audioObjects.fullyout.load();
                            audioObjects.letgoandhold.load();
                            audioObjects.fullyinHold.load();
                            audioObjects.normalbreath.load();
                            audioObjects.nextRound.load();
                            break;
                        case 'BRWLink':
                            openPage(programPage, BRWPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRW.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BBLink':
                            openPage(programPage, BBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'brtLink2':
                            openPage(programPage, brtPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.bell.load();
                            break;
                        case 'lungsLink2':
                            openPage(programPage, lungsPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backLungs.style.display = "block";
                            backProgram.style.display = "none";
                            break;
                        case 'CTLink2':
                            openPage(programPage, CTPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backCT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.exhale.load();
                            audioObjects.inhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'HATLink':
                            openPage(programPage, HATPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHAT.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchWalk.load();
                            audioObjects.lightNasal.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'HATCLink':
                            openPage(programPage, HATCPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHATC.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchRun.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'AHATLink':
                            openPage(programPage, AHATPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backAHAT.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchRun.load();
                            audioObjects.lightNasal.load();
                            audioObjects.normalbreath.load();
                            break;
                    }
                });
            }
            if(BRTmax > BRTlatestResult) {
                BRTinnerText += '<br><br>Comparando com o seu teste mais longo, seus resultados est\u00E3o caindo. Certifique-se de ser consistente em sua pr\u00E1tica para voltar aos seus melhores resultados.'
                BRTinfoOverview.innerHTML = BRTinnerText;
            } else {
                BRTinnerText += '<br><br>Bem feito. Parece que seu \u00FAltimo teste tamb\u00E9m \u00E9 o mais longo. Continue seguindo o Programa Briza para alcan\u00E7ar resultados ainda melhores'
                BRTinfoOverview.innerHTML = BRTinnerText;
            }
            document.getElementById('BRTnumberOfSessions').value = BRTnumberOfTests + ' Testes';
            document.getElementById('BRTlongestRound').value = BRTmax + ' segundos ' + formatDateAsDMY(BRTdateOfLongestResult);
            document.getElementById('BRTlatestRound').value = BRTlatestResult + ' segundos ' + formatDateAsDMY(BRTlastDate);
        } else if (BRTnumberOfTests == 0) {
            BRTinfoOverview.innerHTML = 'Nenhum resultado ainda';
            for (var i = 0; i < BRTinfoOverviewElements.length; i++) {
                BRTinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('BRTContainer').style.display = 'none';
            personalTraining.innerHTML = '<div class="breathingpages">' +
                '<h3>Parece que voc\u00EA ainda n\u00E3o fez o seu Teste de Reten\u00E7\u00E3o Briza. Descubra qual \u00E9 a sua pontua\u00E7\u00E3o para come\u00E7ar com o Programa Briza</h3> ' +
                '<a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brtPT.svg" /></a>' +
                '</div>';
            document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                var targetElement = event.target;

                // If the target is an image inside the link, get the parent element
                if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                    targetElement = targetElement.parentElement;
                }

                var elementId = targetElement.id;

                switch (elementId) {
                    case 'brtLink2':
                        openPage(programPage, brtPage, 'slideLeft');
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        backBRT2.style.display = "block";
                        backProgram.style.display = "none";
                        audioObjects.bell.load();
                        break;
                }
            });
        }

    } else {
        if (BRTnumberOfTests >= 1) {
            var BRTinnerText = '';
            for (var i = 0; i < BRTinfoOverviewElements.length; i++) {
                BRTinfoOverviewElements[i].style.display = 'inline-flex';
            }
            document.getElementById('BRTContainer').style.display = 'block';
            if (BRTlatestResult <= 15) {
                BRTinnerText = 'Based on your latest test (' + BRTlatestResult + ' seconds), it seems that your resilience to CO2 is very low.<br>';
                BRTinnerText += '<br>You may experience difficulties getting a good night\'s sleep, frequent mouth breathing, waking up with a dry mouth, frequent yawning, and low energy levels during the day.<br>';
                BRTinnerText += '<br> It is recommended that you focus on establishing a Briza Program routine to improve your fitness and well-being.';
                BRTinfoOverview.innerHTML = BRTinnerText;
                personalTraining.innerHTML = "";
                personalTraining.innerHTML += '<div class="breathingpages">' +
                    '<h2>Your BRT score is: </h2>' +
                    '<h2>' + BRTlatestResult + ' seconds</h2>' +
                    '<p> Routine to improve your breathing efficiency</p> ' +
                    '<div class="BHGrid"> ' +
                    '<div class="row g-2">' +
                    '<p>Every day</p>'+
                    '<div class="col"><a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brt2.svg" /></a></div>' +
                    '<div class="col"><a id="YBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/yogic.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="BBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brizabreathing.svg" /></a></div>' +
                    '<div class="col"><a></a></div>' +
                    '<div class="w-100"></div>' +
                    '<p>At least 3 times a week</p>' +
                    '<div class="col"><a id="BRELink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverysit.svg" /></a></div>' +
                    '<div class="col"><a id="BRWLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverywalking.svg" /></a></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="brizaprogram">' +
                    '<p class="atention"> Do NOT push yourself over your limits. If you have any serious health conditions, to ensure these breathing exercises are safe to you, consult a doctor before practicing any of the Briza Breath & Performance App`s exercises</p>' +
                    '</div>';
                document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                    var targetElement = event.target;

                    // If the target is an image inside the link, get the parent element
                    if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                        targetElement = targetElement.parentElement;
                    }

                    var elementId = targetElement.id;

                    switch (elementId) {
                        case 'YBLink':
                            openPage(programPage, YBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backYB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.exhale.load();
                            audioObjects.inhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BRELink':
                            openPage(programPage, BREPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRE.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BRWLink':
                            openPage(programPage, BRWPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRW.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'brtLink2':
                            openPage(programPage, brtPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.bell.load();
                            break;
                        case 'BBLink':
                            openPage(programPage, BBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                    }
                });
            } else if (BRTlatestResult >= 15 && BRTlatestResult <= 25) {
                BRTinnerText = 'Based on your latest test (' + BRTlatestResult + ' seconds), your resilience to CO2 is relatively good.<br>';
                BRTinnerText += '<br>You are likely breathing through your nose most of the time and enjoying restful sleep. Your energy levels and concentration are generally satisfactory.<br>';
                BRTinnerText += '<br>It is recommended that you establish a Briza Program routine to improve your breathing efficiency and gain better results';
                BRTinfoOverview.innerHTML = BRTinnerText;
                personalTraining.innerHTML = "";
                personalTraining.innerHTML += '<div class="breathingpages">' +
                    '<h2>Your BRT score is: </h2>' +
                    '<h2>' + BRTlatestResult + ' seconds</h2>' +
                    '<p> Routine to improve your breathing efficiency</p> ' +
                    '<div class="BHGrid"> ' +
                    '<div class="row g-2">' +
                    '<p>Every day</p>' +
                    '<div class="col"><a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brt2.svg" /></a></div>' +
                    '<div class="col"><a id="BBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brizabreathing.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="YBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/yogic.svg" /></a></div>' +
                    '<div class="col"><a id="BRWLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverywalking.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<p>At least 2 times per week</p>' +
                    '<div class="col"><a id="HATLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/hat.svg" /></a></div>' +
                    '<div class="col"><a id="WHLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/guidedhyper2.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="lungsLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/lungsexpansion2.svg"></a></div>' +
                    '<div class="col"><a></a></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="brizaprogram">' +
                    '<p class="atention"> Do NOT push yourself over your limits. If you have any serious health conditions, to ensure these breathing exercises are safe to you, consult a doctor before practicing any of the Briza Breath & Performance App`s exercises</p>' +
                    '</div>';
                document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                    var targetElement = event.target;

                    // If the target is an image inside the link, get the parent element
                    if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                        targetElement = targetElement.parentElement;
                    }

                    var elementId = targetElement.id;

                    switch (elementId) {
                        case 'YBLink':
                            openPage(programPage, YBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backYB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.exhale.load();
                            audioObjects.inhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BRWLink':
                            openPage(programPage, BRWPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRW.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BBLink':
                            openPage(programPage, BBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'brtLink2':
                            openPage(programPage, brtPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.bell.load();
                            break;
                        case 'lungsLink2':
                            openPage(programPage, lungsPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backLungs.style.display = "block";
                            backProgram.style.display = "none";
                            break;
                        case 'HATLink':
                            openPage(programPage, HATPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHAT.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchWalk.load();
                            audioObjects.lightNasal.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'WHLink2':
                            openPage(programPage, WHPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backWH2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.fullyin.load();
                            audioObjects.fullyout.load();
                            audioObjects.letgoandhold.load();
                            audioObjects.fullyinHold.load();
                            audioObjects.normalbreath.load();
                            audioObjects.nextRound.load();
                            break;
                    }
                });
            } else if (BRTlatestResult >= 25 && BRTlatestResult <= 35) {
                BRTinnerText = 'Based on your latest test (' + BRTlatestResult + ' seconds), your resilience to CO2 is excellent.<br>';
                BRTinnerText += '<br>You are likely experiencing the benefits of efficient breathing, including restorative sleep, high energy levels, and good focus.<br>';
                BRTinnerText += '<br>It is recommended that you establish a Briza Program routine to achieve even better results and feel limitless';
                BRTinfoOverview.innerHTML = BRTinnerText;
                personalTraining.innerHTML = "";
                personalTraining.innerHTML += '<div class="breathingpages">' +
                    '<h2>Your BRT score is: </h2>' +
                    '<h2>' + BRTlatestResult + ' seconds</h2>' +
                    '<p> Routine to improve your breathing efficiency</p> ' +
                    '<div class="BHGrid"> ' +
                    '<div class="row g-2">' +
                    '<p>Every day</p>' +
                    '<div class="col"><a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brt2.svg" /></a></div>' +
                    '<div class="col"><a id="BBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brizabreathing.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="BRWLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverywalking.svg" /></a></div>' +
                    '<div class="col"><a id="HATLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/hat.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<p>At least 3 times a week</p>' +
                    '<div class="col"><a id="CTLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/tolerance2.svg"></a></div>' +
                    '<div class="col"><a id="WHLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/guidedhyper2.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="lungsLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/lungsexpansion2.svg"></a></div>' +
                    '<div class="col"><a></a></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="brizaprogram">' +
                    '<p class="atention"> Do NOT push yourself over your limits. If you have any serious health conditions, to ensure these breathing exercises are safe to you, consult a doctor before practicing any of the Briza Breath & Performance App`s exercises</p>' +
                    '</div>';
                document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                    var targetElement = event.target;

                    // If the target is an image inside the link, get the parent element
                    if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                        targetElement = targetElement.parentElement;
                    }

                    var elementId = targetElement.id;

                    switch (elementId) {
                        case 'WHLink2':
                            openPage(programPage, WHPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backWH2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.fullyin.load();
                            audioObjects.fullyout.load();
                            audioObjects.letgoandhold.load();
                            audioObjects.fullyinHold.load();
                            audioObjects.normalbreath.load();
                            audioObjects.nextRound.load();
                            break;
                        case 'BRWLink':
                            openPage(programPage, BRWPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRW.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BBLink':
                            openPage(programPage, BBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'brtLink2':
                            openPage(programPage, brtPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.bell.load();
                            break;
                        case 'lungsLink2':
                            openPage(programPage, lungsPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backLungs.style.display = "block";
                            backProgram.style.display = "none";
                            break;
                        case 'CTLink2':
                            openPage(programPage, CTPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backCT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.exhale.load();
                            audioObjects.inhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'HATLink':
                            openPage(programPage, HATPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHAT.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchWalk.load();
                            audioObjects.lightNasal.load();
                            audioObjects.normalbreath.load();
                            break;
                    }
                });
            } else if (BRTlatestResult > 35) {
                BRTinnerText = 'Based on your latest test (' + BRTlatestResult + ' seconds), your resilience to CO2 is excellent.<br>';
                BRTinnerText += '<br>You are likely experiencing the benefits of efficient breathing, including restorative sleep, high energy levels, and great focus.<br>';
                BRTinnerText += 'Make sure to keep up the good results by keeping a Briza Program routine. Use the app to save your results and keep track of them';
                BRTinfoOverview.innerHTML = BRTinnerText;
                personalTraining.innerHTML = "";
                personalTraining.innerHTML += '<div class="breathingpages">' +
                    '<h2>Your BRT score is: </h2>' +
                    '<h2>' + BRTlatestResult + ' seconds</h2>' +
                    '<p> Routine to improve your breathing efficiency</p> ' +
                    '<div class="BHGrid"> ' +
                    '<div class="row g-2">' +
                    '<p>Every day</p>' +
                    '<div class="col"><a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brt2.svg" /></a></div>' +
                    '<div class="col"><a id="BBLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brizabreathing.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="BRWLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/breathrecoverywalking.svg" /></a></div>' +
                    '<div class="col"><a id="CTLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/tolerance2.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<p>At least 3 times a week</p>' +
                    '<div class="col"><a id="HATCLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/hatcycling.svg" /></a></div>' +
                    '<div class="col"><a id="AHATLink"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/advancedhat.svg" /></a></div>' +
                    '<div class="w-100"></div>' +
                    '<div class="col"><a id="lungsLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/lungsexpansion2.svg"></a></div>' +
                    '<div class="col"><a id="WHLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/guidedhyper2.svg"></a></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="brizaprogram">' +
                    '<p class="atention"> Do NOT push yourself over your limits. If you have any serious health conditions, to ensure these breathing exercises are safe to you, consult a doctor before practicing any of the Briza Breath & Performance App`s exercises</p>' +
                    '</div>';
                document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                    var targetElement = event.target;

                    // If the target is an image inside the link, get the parent element
                    if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                        targetElement = targetElement.parentElement;
                    }

                    var elementId = targetElement.id;

                    switch (elementId) {
                         case 'WHLink2':
                            openPage(programPage, WHPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backWH2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.fullyin.load();
                            audioObjects.fullyout.load();
                            audioObjects.letgoandhold.load();
                            audioObjects.fullyinHold.load();
                            audioObjects.normalbreath.load();
                            audioObjects.nextRound.load();
                            break;
                        case 'BRWLink':
                            openPage(programPage, BRWPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRW.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'BBLink':
                            openPage(programPage, BBPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBB.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.inhale.load();
                            audioObjects.exhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'brtLink2':
                            openPage(programPage, brtPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.bell.load();
                            break;
                        case 'lungsLink2':
                            openPage(programPage, lungsPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backLungs.style.display = "block";
                            backProgram.style.display = "none";
                            break;
                        case 'CTLink2':
                            openPage(programPage, CTPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backCT2.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.exhale.load();
                            audioObjects.inhale.load();
                            audioObjects.hold.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'HATLink':
                            openPage(programPage, HATPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHAT.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchWalk.load();
                            audioObjects.lightNasal.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'HATCLink':
                            openPage(programPage, HATCPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHATC.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchRun.load();
                            audioObjects.normalbreath.load();
                            break;
                        case 'AHATLink':
                            openPage(programPage, AHATPage, 'slideLeft');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backAHAT.style.display = "block";
                            backProgram.style.display = "none";
                            audioObjects.pinchRun.load();
                            audioObjects.lightNasal.load();
                            audioObjects.normalbreath.load();
                            break;
                    }
                });
            }
            if (BRTmax > BRTlatestResult) {
                BRTinnerText += '<br><br>Comparing with your longest test, your results are dropping. Make sure to be consistent in your practice to get back to your best results.'
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
            personalTraining.innerHTML = '<div class="breathingpages">' +
                '<h3>It looks like you haven`t done your Briza Retention Test yet. Find out what your BRT score is, to get started with the Briza Program</h3> ' +
                '<a id="brtLink2"><img class="homepageimgs" loading="lazy" src="https://brizastorage.blob.core.windows.net/images/brt.svg" /></a>' +
                '</div>';
            document.getElementById('personalizedBriza').addEventListener('click', function (event) {
                var targetElement = event.target;

                // If the target is an image inside the link, get the parent element
                if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'A') {
                    targetElement = targetElement.parentElement;
                }

                var elementId = targetElement.id;

                switch (elementId) {
                    case 'brtLink2':
                        openPage(programPage, brtPage, 'slideLeft');
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        backBRT2.style.display = "block";
                        backProgram.style.display = "none";
                        audioObjects.bell.load();
                        break;
                }
            });
        }
    }
}

var BRTresultPage = document.getElementById('BRTresultPage'),
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
                    // Remove the deleted form
                    $('.BRTdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BRTdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BRTupdateChart(BRTstartDate, BRTendDate);
                            BRTupdateOverview();
                            openPage(BRTresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRTresults.style.display = "none";
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
                if (isPortuguese) {
                    BRTresultDateHeader.innerHTML = 'Resultados do dia ' + BRTselectedDate;
                    BRTresultSessions.innerHTML += '<form method="post" class="BRTdelete-form">' +
                        '<div>Teste ' + BRTnumberOfResults + ' __________</div>' +
                        '<input value="' + BRTseconds + ' segundos" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BRTresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger BRTdelete-button" />' +
                        '</form>';
                } else {
                    BRTresultDateHeader.innerHTML = 'Results on ' + BRTselectedDate;
                    BRTresultSessions.innerHTML += '<form method="post" class="BRTdelete-form">' +
                        '<div>Test ' + BRTnumberOfResults + ' __________</div>' +
                        '<input value="' + BRTseconds + ' seconds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BRTresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger BRTdelete-button" />' +
                        '</form>';
                }
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
    backBRTresults.style.display = "block";
    closeModalResults();
}
// END BRT
// YB
// Initialize startDate and endDate
var YBtoday = new Date();
var YBlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var YBresultDate = new Date(YBtoday);
    YBresultDate.setDate(YBtoday.getDate() - i);
    YBlast7Dates.push(YBresultDate); // Push the Date object directly
}

var YBendDate = YBlast7Dates[YBlast7Dates.length - 1]; // Initialize with the latest date
var YBstartDate = YBlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var YBtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var YBContainer = document.getElementById('YBContainer');
YBContainer.addEventListener('touchstart', function (event) {
    YBtouchStartX = event.touches[0].clientX;
});

var YBscrollThreshold = 10; // Adjust this value to control the scroll threshold

var YBlastScrollX = null;
var { YBchartData, YBmaxYValue, YBselectedDataDatesYear } = YBupdateChartData(YBstartDate, YBendDate, fetchedDataArray);
var YBinfoOverview = document.getElementById('YBinfoOverview');
var YBdateOfLongestResult;
var YBlastIntervals;
var YBintervals;
var YBlastDate;
var YBlatestResult;
var YBchart;
function YBinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var YBdateA = new Date(a.YBresultDate);
        var YBdateB = new Date(b.YBresultDate);
        return YBdateA - YBdateB;
    });
    var YBselectedDataDatesMonthDay = YBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        YBchart = new Chart("YBchart", {
            type: "bar",
            data: {
                labels: YBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: YBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados da Respira\u00E7\u00E3o Yogi " + "(" + getYear(YBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'M\u00E9dia do dia ';
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
                            max: YBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        YBchart = new Chart("YBchart", {
            type: "bar",
            data: {
                labels: YBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: YBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your Yogic Breathing results " + "(" + getYear(YBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
                            max: YBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    YBContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (YBtouchStartX !== null) {
            var YBtouchMoveX = event.touches[0].clientX;

            if (YBlastScrollX !== null) {
                var YBdelta = YBtouchMoveX - YBlastScrollX;

                if (Math.abs(YBdelta) >= YBscrollThreshold) {
                    YBlastScrollX = YBtouchMoveX;

                    if (YBdelta > 0) {
                        // Scroll right, decrease the date range
                        YBendDate.setDate(YBendDate.getDate() - 1);
                        YBstartDate.setDate(YBstartDate.getDate() - 1);
                        if (isPortuguese) {
                            YBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Yogi " + "(" + getYear(YBendDate) + ")";
                        } else {
                            YBchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(YBendDate) + ")";
                        }
                    } else if (YBdelta < 0) {
                        if (formatDateAsDMY(YBendDate) == formatDateAsDMY(YBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            YBendDate.setDate(YBendDate.getDate() + 1);
                            YBstartDate.setDate(YBstartDate.getDate() + 1);
                            if (isPortuguese) {
                                YBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Yogi " + "(" + getYear(YBendDate) + ")";
                            } else {
                                YBchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(YBendDate) + ")";
                            }
                        }
                    }
                    YBupdateChart(YBstartDate, YBendDate);
                }
            } else {
                YBlastScrollX = YBtouchMoveX;
            }
        }
    });

    YBContainer.addEventListener('touchend', function () {
        YBlastScrollX = null;
    });
    YBContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var YBdelta = event.deltaX * 0.1;

        if (YBdelta < 0) {
            // Scroll left, decrease the date range
            YBendDate.setDate(YBendDate.getDate() - 1);
            YBstartDate.setDate(YBstartDate.getDate() - 1);
            if (isPortuguese) {
                YBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Yogi " + "(" + getYear(YBendDate) + ")";
            } else {
                YBchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(YBendDate) + ")";
            }
        } else if (YBdelta > 0) {
            if (formatDateAsDMY(YBendDate) == formatDateAsDMY(YBtoday)) { }
            else {
                // Scroll right, increase the date range
                YBendDate.setDate(YBendDate.getDate() + 1);
                YBstartDate.setDate(YBstartDate.getDate() + 1);
                if (isPortuguese) {
                    YBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Yogi " + "(" + getYear(YBendDate) + ")";
                } else {
                    YBchart.options.title.text = "Your Yogic Breathing results " + "(" + getYear(YBendDate) + ")";
                }
            }
        }
        YBupdateChart(YBstartDate, YBendDate);
    });
    YBupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function YBhandleBarClick(event, array) {
        var YBindex = array[0]._index; // Get the clicked bar index
        var YBselectedDate = YBselectedDataDatesYear[YBindex];
        YBdisplayDetailedInfo(YBselectedDate);
    }
    YBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            YBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        YBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                YBhandleBarClick(event, array);
            }
        };
    }
}

function YBfindMaxResult() {
    var YBmaxResult = 0;

    fetchedDataArray.forEach(YBresultData => {
        var YBtimeString = YBresultData.ybTotalTime;

        // Check if the timeString is not empty before parsing
        if (YBtimeString !== undefined && YBtimeString !== '' && YBtimeString !== null) {
            var seconds = parseTimeToSeconds2(YBtimeString);
            YBmaxResult = Math.max(YBmaxResult, secondsToMinutes(seconds));
        }
    });
    return YBmaxResult;
}
function YBfindMaxResult2() {
    var YBmaxResult = 0;

    fetchedDataArray.forEach(YBresultData => {
        var YBtimeString = YBresultData.ybTotalTime;

        // Check if the timeString is not empty before parsing
        if (YBtimeString !== undefined && YBtimeString !== '' && YBtimeString !== null) {
            var seconds = parseTimeToSeconds2(YBtimeString);
            YBmaxResult = Math.max(YBmaxResult, seconds);
        }
    });
    return YBmaxResult;
}
function YBupdateChartData(YBstartDate, YBendDate) {
    var YBdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var YBcurrentDate = new Date(YBstartDate);
    while (YBcurrentDate <= YBendDate) {
        YBdateRange.push(new Date(YBcurrentDate));
        YBcurrentDate.setDate(YBcurrentDate.getDate() + 1); // Move to the next day
    }

    var YBaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(YBresultData => {
        var YBresultDate = new Date(YBresultData.ybResultDate);
        var YBseconds;
        var YBminutes;
        var YBtimeString = YBresultData.ybTotalTime;
        if (YBtimeString !== undefined && YBtimeString !== '' && YBtimeString !== null) {
            YBseconds = parseTimeToSeconds2(YBtimeString);
            YBminutes = secondsToMinutes(YBseconds);
        } else {
            YBminutes = 0;
        }
        if (!isNaN(YBresultDate.getTime())) {
            var YBformattedDate = formatDateAsDMY(YBresultDate);

            if (!YBaggregatedData[YBformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                YBaggregatedData[YBformattedDate] = { YBtotalValue: parseFloat(YBminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                YBaggregatedData[YBformattedDate].YBtotalValue += parseFloat(YBminutes);
                YBaggregatedData[YBformattedDate].count++;
            }
        }
    });

    var YBmaxResult = YBfindMaxResult();
    var YBchartData = YBdateRange.map(YBresultDate => {
        var YBformattedDate = formatDateAsDMY(YBresultDate);
        var YBaggregatedDatum = YBaggregatedData[YBformattedDate];
        return YBaggregatedDatum ? YBaggregatedDatum.YBtotalValue / YBaggregatedDatum.count : 0;
    });

    return {
        YBchartData: YBchartData,
        YBmaxYValue: Math.floor(YBmaxResult + 2),
        YBselectedDataDatesYear: YBdateRange.map(formatDateAsDMY)
    };
}
function YBupdateChart(YBstartDate, YBendDate) {
    var { YBchartData, YBmaxYValue, YBselectedDataDatesYear } = YBupdateChartData(YBstartDate, YBendDate);

    // Update x-axis labels and chart data
    var YBselectedDataDatesMonthDay = YBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    YBchart.data.labels = YBselectedDataDatesMonthDay;
    YBchart.data.datasets[0].data = YBchartData;
    YBchart.options.scales.yAxes[0].ticks.max = YBmaxYValue;
    function YBhandleBarClick(event, array) {
        var YBindex = array[0]._index; // Get the clicked bar index
        var YBselectedDate = YBselectedDataDatesYear[YBindex];
        YBdisplayDetailedInfo(YBselectedDate);
    }
    YBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            YBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        YBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                YBhandleBarClick(event, array);
            }
        };
    }
    YBchart.update();
}
var YBnumberOfTests;
function YBupdateOverview() {
    YBnumberOfTests = 0;
    var YBmax = YBfindMaxResult();
    var YBmax2 = YBfindMaxResult2();
    var YBinfoOverviewElements = document.getElementsByClassName('YBinfoOverview');
    fetchedDataArray.forEach(YBresultData => {
        var YBtimeString = YBresultData.ybTotalTime;
        var YBdateString = YBresultData.ybResultDate;
        var YBrounds = YBresultData.ybIntervals;
        // Check if the timeString is not empty before parsing
        if (YBtimeString !== undefined && YBtimeString !== '' && YBtimeString !== null) {
            var YBseconds = parseTimeToSeconds2(YBtimeString);
            // Store the value of dateOfLongestResult when YBmax is updated
            if (YBseconds === YBmax2) {
                YBdateOfLongestResult = YBdateString;
                YBintervals = YBrounds;
            }
            YBlatestResult = parseTimeToSeconds2(YBtimeString);
            YBlastDate = YBdateString;
            YBlastIntervals = YBrounds;
            YBnumberOfTests++;
        }
    });
    if (isPortuguese) {
        if (YBnumberOfTests !== 0) {
            YBinfoOverview.innerHTML = '';
            for (var i = 0; i < YBinfoOverviewElements.length; i++) {
                YBinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('YBContainer').style.display = 'block';
            document.getElementById('YBnumberOfSessions').value = YBnumberOfTests + ' Sess\u00F5es';
            document.getElementById('YBlongestRound').value = convertMinToMinSec(YBmax) + YBintervals + ' rounds ' + formatDateAsDMY(YBdateOfLongestResult);
            document.getElementById('YBlatestRound').value = convertMinToMinSec(secondsToMinutes(YBlatestResult)) + YBlastIntervals + ' rounds ' + formatDateAsDMY(YBlastDate);
            document.getElementById('YBaccordion').style.display = 'block';
        } else {
            document.getElementById('YBaccordion').style.display = 'none';
            YBinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
            for (var i = 0; i < YBinfoOverviewElements.length; i++) {
                YBinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('YBContainer').style.display = 'none';
        }
    } else {
        if (YBnumberOfTests !== 0) {
            YBinfoOverview.innerHTML = '';
            for (var i = 0; i < YBinfoOverviewElements.length; i++) {
                YBinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('YBContainer').style.display = 'block';
            document.getElementById('YBnumberOfSessions').value = YBnumberOfTests + ' Sessions';
            document.getElementById('YBlongestRound').value = convertMinToMinSec(YBmax) + ' ' + YBintervals + ' rounds ' + formatDateAsDMY(YBdateOfLongestResult);
            document.getElementById('YBlatestRound').value = convertMinToMinSec(secondsToMinutes(YBlatestResult)) + ' ' + YBlastIntervals + ' rounds ' + formatDateAsDMY(YBlastDate);
            document.getElementById('YBaccordion').style.display = 'block';
        } else {
            document.getElementById('YBaccordion').style.display = 'none';
            YBinfoOverview.innerHTML = 'No results yet';
            for (var i = 0; i < YBinfoOverviewElements.length; i++) {
                YBinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('YBContainer').style.display = 'none';
        }
    }
}
var YBresultPage = document.getElementById('YBresultPage'),
    YBresultDateHeader = document.getElementById('YBresultDateHeader'),
    YBresultSessions = document.getElementById('YBresultSessions');

function YBdisplayDetailedInfo(YBselectedDate) {
    function YBdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.YBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.YBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            YBupdateChart(YBstartDate, YBendDate);
                            YBupdateOverview();
                            openPage(YBresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backYBresults.style.display = "none";
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
    var YBnumberOfResults = 1;
    YBresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(YBresultData => {
        var YBtimeString = YBresultData.ybTotalTime;
        var YBdateString = YBresultData.ybResultDate;
        var YBresultId = YBresultData.resultId;
        YBintervals = YBresultData.ybIntervals;
        // Check if the timeString is not empty before parsing
        if (YBtimeString !== undefined && YBtimeString !== '' && YBtimeString !== null) {
            var YBseconds = parseTimeToSeconds2(YBtimeString);
            // Store the value of dateOfLongestResult when YBmax is updated
            if (YBselectedDate === formatDateAsDMY(YBdateString)) {
                if (isPortuguese) {
                    YBresultDateHeader.innerHTML = 'Resultados do dia ' + YBselectedDate;
                    YBresultSessions.innerHTML += '<form method="post" class="YBdelete-form">' +
                        '<div>Sess\u00E3o ' + YBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(YBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + YBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + YBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger YBdelete-button" />' +
                        '</form>';
                } else {
                    YBresultDateHeader.innerHTML = 'Results on ' + YBselectedDate;
                    YBresultSessions.innerHTML += '<form method="post" class="YBdelete-form">' +
                        '<div>Session ' + YBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(YBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + YBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + YBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger YBdelete-button" />' +
                        '</form>';
                }
                YBnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var YBdeleteButtons = document.querySelectorAll('.YBdelete-button');
    YBdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var YBform = this.closest('.YBdelete-form');
            var YBresultId = YBform.querySelector('[name="resultId"]').value;
            YBdeleteResult(YBresultId);
        });
    });

    openPage(resultsPage, YBresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backYBresults.style.display = "block";
    closeModalResults();
}
// END YB
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
    if (isPortuguese) {
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
                    text: "Seus resultados de Exerc\u00EDcio de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o " + "(" + getYear(BREendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'M\u00E9dia do dia';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
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
                    text: "Your Briza Recovery Exercise results " + "(" + getYear(BREendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
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
                        if (isPortuguese) {
                            BREchart.options.title.text = "Seus resultados de Exerc\u00EDcio de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o " + "(" + getYear(BREendDate) + ")";
                        } else {
                            BREchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BREendDate) + ")";
                        }
                    } else if (BREdelta < 0) {
                        if (formatDateAsDMY(BREendDate) == formatDateAsDMY(BREtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BREendDate.setDate(BREendDate.getDate() + 1);
                            BREstartDate.setDate(BREstartDate.getDate() + 1);
                            if (isPortuguese) {
                                BREchart.options.title.text = "Seus resultados de Exerc\u00EDcio de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o " + "(" + getYear(BREendDate) + ")";
                            } else {
                                BREchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BREendDate) + ")";
                            }
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
            if (isPortuguese) {
                BREchart.options.title.text = "Seus resultados de Exerc\u00EDcio de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o " + "(" + getYear(BREendDate) + ")";
            } else {
                BREchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BREendDate) + ")";
            }
        } else if (BREdelta > 0) {
            if (formatDateAsDMY(BREendDate) == formatDateAsDMY(BREtoday)) { }
            else {
                // Scroll right, increase the date range
                BREendDate.setDate(BREendDate.getDate() + 1);
                BREstartDate.setDate(BREstartDate.getDate() + 1);
                if (isPortuguese) {
                    BREchart.options.title.text = "Seus resultados de Exerc\u00EDcio de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o " + "(" + getYear(BREendDate) + ")";
                } else {
                    BREchart.options.title.text = "Your Breath Recovery Exercise results " + "(" + getYear(BREendDate) + ")";
                }
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
                BREaggregatedData[BREformattedDate] = { BREtotalValue: parseFloat(BREminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                BREaggregatedData[BREformattedDate].BREtotalValue += parseFloat(BREminutes);
                BREaggregatedData[BREformattedDate].count++;
            }
        }
    });

    var BREmaxResult = BREfindMaxResult();
    var BREchartData = BREdateRange.map(BREresultDate => {
        var BREformattedDate = formatDateAsDMY(BREresultDate);
        var BREaggregatedDatum = BREaggregatedData[BREformattedDate];
        return BREaggregatedDatum ? BREaggregatedDatum.BREtotalValue / BREaggregatedDatum.count : 0;
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
var BREnumberOfTests;
function BREupdateOverview() {
    BREnumberOfTests = 0;
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
    if (isPortuguese) {
        if (BREnumberOfTests !== 0) {
            BREinfoOverview.innerHTML = '';
            for (var i = 0; i < BREinfoOverviewElements.length; i++) {
                BREinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('BREContainer').style.display = 'block';
            document.getElementById('BREnumberOfSessions').value = BREnumberOfTests + ' Sess\u00F5es';
            document.getElementById('BRElongestRound').value = convertMinToMinSec(BREmax) + ' ' + BREintervals + ' rounds ' + formatDateAsDMY(BREdateOfLongestResult);
            document.getElementById('BRElatestRound').value = convertMinToMinSec(secondsToMinutes(BRElatestResult)) + ' ' + BRElastIntervals + ' rounds ' + formatDateAsDMY(BRElastDate);
            document.getElementById('BREaccordion').style.display = 'block';
        } else {
            document.getElementById('BREaccordion').style.display = 'none';
            BREinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
            for (var i = 0; i < BREinfoOverviewElements.length; i++) {
                BREinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('BREContainer').style.display = 'none';
        }
    } else {
        if (BREnumberOfTests !== 0) {
            BREinfoOverview.innerHTML = '';
            for (var i = 0; i < BREinfoOverviewElements.length; i++) {
                BREinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('BREContainer').style.display = 'block';
            document.getElementById('BREnumberOfSessions').value = BREnumberOfTests + ' Sessions';
            document.getElementById('BRElongestRound').value = convertMinToMinSec(BREmax) + ' ' + BREintervals + ' rounds ' + formatDateAsDMY(BREdateOfLongestResult);
            document.getElementById('BRElatestRound').value = convertMinToMinSec(secondsToMinutes(BRElatestResult)) + ' ' + BRElastIntervals + ' rounds ' + formatDateAsDMY(BRElastDate);
            document.getElementById('BREaccordion').style.display = 'block';
        } else {
            document.getElementById('BREaccordion').style.display = 'none';
            BREinfoOverview.innerHTML = 'No results yet';
            for (var i = 0; i < BREinfoOverviewElements.length; i++) {
                BREinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('BREContainer').style.display = 'none';
        }
    }
}
var BREresultPage = document.getElementById('BREresultPage'),
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
                    // Remove the deleted form
                    $('.BREdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BREdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BREupdateChart(BREstartDate, BREendDate);
                            BREupdateOverview();
                            openPage(BREresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBREresults.style.display = "none";
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
                if (isPortuguese) {
                    BREresultDateHeader.innerHTML = 'Resultados do dia ' + BREselectedDate;
                    BREresultSessions.innerHTML += '<form method="post" class="BREdelete-form">' +
                        '<div>Sess\u00E3o ' + BREnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(BREseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + BREintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BREresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger BREdelete-button" />' +
                        '</form>';
                } else {
                    BREresultDateHeader.innerHTML = 'Results on ' + BREselectedDate;
                    BREresultSessions.innerHTML += '<form method="post" class="BREdelete-form">' +
                        '<div>Session ' + BREnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(BREseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + BREintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BREresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger BREdelete-button" />' +
                        '</form>';
                }
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
    backBREresults.style.display = "block";
    closeModalResults();
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
    if (isPortuguese) {
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
                    text: "Seus resultados de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o Caminhando " + "(" + getYear(BRWendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Resultado Total do dia';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
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
                    text: "Your Breath Recovery while Walking results " + "(" + getYear(BRWendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
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
                        if (isPortuguese) {
                            BRWchart.options.title.text = "Seus resultados de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o Caminhando " + "(" + getYear(BRWendDate) + ")";
                        } else {
                            BRWchart.options.title.text = "Your Breath Recovery while Walking results " + "(" + getYear(BRWendDate) + ")";
                        }
                    } else if (BRWdelta < 0) {
                        if (formatDateAsDMY(BRWendDate) == formatDateAsDMY(BRWtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BRWendDate.setDate(BRWendDate.getDate() + 1);
                            BRWstartDate.setDate(BRWstartDate.getDate() + 1);
                            if (isPortuguese) {
                                BRWchart.options.title.text = "Seus resultados de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o Caminhando " + "(" + getYear(BRWendDate) + ")";
                            } else {
                                BRWchart.options.title.text = "Your Breath Recovery while Walking results " + "(" + getYear(BRWendDate) + ")";
                            }
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
            if (isPortuguese) {
                BRWchart.options.title.text = "Seus resultados de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o Caminhando " + "(" + getYear(BRWendDate) + ")";
            } else {
                BRWchart.options.title.text = "Your Breath Recovery while Walking results " + "(" + getYear(BRWendDate) + ")";
            }
        } else if (BRWdelta > 0) {
            if (formatDateAsDMY(BRWendDate) == formatDateAsDMY(BRWtoday)) { }
            else {
                // Scroll right, increase the date range
                BRWendDate.setDate(BRWendDate.getDate() + 1);
                BRWstartDate.setDate(BRWstartDate.getDate() + 1);
                if (isPortuguese) {
                    BRWchart.options.title.text = "Seus resultados de Recupera\u00E7\u00E3o da Respira\u00E7\u00E3o Caminhando " + "(" + getYear(BRWendDate) + ")";
                } else {
                    BRWchart.options.title.text = "Your Breath Recovery while Walking results " + "(" + getYear(BRWendDate) + ")";
                }
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
                BRWaggregatedData[BRWformattedDate] = { BRWtotalValue: parseFloat(BRWminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                BRWaggregatedData[BRWformattedDate].BRWtotalValue += parseFloat(BRWminutes);
                BRWaggregatedData[BRWformattedDate].count++;
            }
        }
    });

    var BRWmaxResult = BRWfindMaxResult();
    var BRWchartData = BRWdateRange.map(BRWresultDate => {
        var BRWformattedDate = formatDateAsDMY(BRWresultDate);
        var BRWaggregatedDatum = BRWaggregatedData[BRWformattedDate];
        return BRWaggregatedDatum ? BRWaggregatedDatum.BRWtotalValue / BRWaggregatedDatum.count : 0;
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
var BRWnumberOfTests;
function BRWupdateOverview() {
    BRWnumberOfTests = 0;
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
    if (isPortuguese) {
        if (BRWnumberOfTests !== 0) {
            BRWinfoOverview.innerHTML = '';
            for (var i = 0; i < BRWinfoOverviewElements.length; i++) {
                BRWinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('BRWContainer').style.display = 'block';
            document.getElementById('BRWnumberOfSessions').value = BRWnumberOfTests + ' Sess\u00F5es';
            document.getElementById('BRWlongestRound').value = convertMinToMinSec(BRWmax) + ' ' + BRWintervals + ' rounds ' + formatDateAsDMY(BRWdateOfLongestResult);
            document.getElementById('BRWlatestRound').value = convertMinToMinSec(secondsToMinutes(BRWlatestResult)) + ' ' + BRWlastIntervals + ' rounds ' + formatDateAsDMY(BRWlastDate);
            document.getElementById('BRWaccordion').style.display = 'block';
        } else {
            document.getElementById('BRWaccordion').style.display = 'none';
            BRWinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
            for (var i = 0; i < BRWinfoOverviewElements.length; i++) {
                BRWinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('BRWContainer').style.display = 'none';
        }
    } else {
        if (BRWnumberOfTests !== 0) {
            BRWinfoOverview.innerHTML = '';
            for (var i = 0; i < BRWinfoOverviewElements.length; i++) {
                BRWinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('BRWContainer').style.display = 'block';
            document.getElementById('BRWnumberOfSessions').value = BRWnumberOfTests + ' Sessions';
            document.getElementById('BRWlongestRound').value = convertMinToMinSec(BRWmax) + ' ' + BRWintervals + ' rounds ' + formatDateAsDMY(BRWdateOfLongestResult);
            document.getElementById('BRWlatestRound').value = convertMinToMinSec(secondsToMinutes(BRWlatestResult)) + ' ' + BRWlastIntervals + ' rounds ' + formatDateAsDMY(BRWlastDate);
            document.getElementById('BRWaccordion').style.display = 'block';
        } else {
            document.getElementById('BRWaccordion').style.display = 'none';
            BRWinfoOverview.innerHTML = 'No results yet';
            for (var i = 0; i < BRWinfoOverviewElements.length; i++) {
                BRWinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('BRWContainer').style.display = 'none';
        }
    }
}
var BRWresultPage = document.getElementById('BRWresultPage'),
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
                    // Remove the deleted form
                    $('.BRWdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BRWdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BRWupdateChart(BRWstartDate, BRWendDate);
                            BRWupdateOverview();
                            openPage(BRWresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBRWresults.style.display = "none";
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
                if (isPortuguese) {
                    BRWresultDateHeader.innerHTML = 'Resultado do dia ' + BRWselectedDate;
                    BRWresultSessions.innerHTML += '<form method="post" class="BRWdelete-form">' +
                        '<div>Sess\u00E3o ' + BRWnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(BRWseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + BRWintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BRWresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger BRWdelete-button" />' +
                        '</form>';
                } else {
                    BRWresultDateHeader.innerHTML = 'Results on ' + BRWselectedDate;
                    BRWresultSessions.innerHTML += '<form method="post" class="BRWdelete-form">' +
                        '<div>Session ' + BRWnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(BRWseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + BRWintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BRWresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger BRWdelete-button" />' +
                        '</form>';
                }
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
    backBRWresults.style.display = "block";
    closeModalResults();
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
    if (isPortuguese) {
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
                    text: "Seus resultados do exerc\u00EDcio de zumbido " + "(" + getYear(HUMendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Resultado Total do dia ';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
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
                    text: "Your Humming Exercise results " + "(" + getYear(HUMendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
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
                        if (isPortuguese) {
                            HUMchart.options.title.text = "Seus resultados do exerc\u00EDcio de zumbido " + "(" + getYear(HUMendDate) + ")";
                        } else {
                            HUMchart.options.title.text = "Your Humming Exercise results " + "(" + getYear(HUMendDate) + ")";
                        }
                    } else if (HUMdelta < 0) {
                        if (formatDateAsDMY(HUMendDate) == formatDateAsDMY(HUMtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            HUMendDate.setDate(HUMendDate.getDate() + 1);
                            HUMstartDate.setDate(HUMstartDate.getDate() + 1);
                            if (isPortuguese) {
                                HUMchart.options.title.text = "Seus resultados do exerc\u00EDcio de zumbido " + "(" + getYear(HUMendDate) + ")";
                            } else {
                                HUMchart.options.title.text = "Your Humming Exercise results " + "(" + getYear(HUMendDate) + ")";
                            }
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
            if (isPortuguese) {
                HUMchart.options.title.text = "Seus resultados do exerc\u00EDcio de zumbido " + "(" + getYear(HUMendDate) + ")";
            } else {
                HUMchart.options.title.text = "Your Humming Exercise results " + "(" + getYear(HUMendDate) + ")";
            }
        } else if (HUMdelta > 0) {
            if (formatDateAsDMY(HUMendDate) == formatDateAsDMY(HUMtoday)) { }
            else {
                // Scroll right, increase the date range
                HUMendDate.setDate(HUMendDate.getDate() + 1);
                HUMstartDate.setDate(HUMstartDate.getDate() + 1);
                if (isPortuguese) {
                    HUMchart.options.title.text = "Seus resultados do exerc\u00EDcio de zumbido " + "(" + getYear(HUMendDate) + ")";
                } else {
                    HUMchart.options.title.text = "Your Humming Exercise results " + "(" + getYear(HUMendDate) + ")";
                }
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
                HUMaggregatedData[HUMformattedDate] = { HUMtotalValue: parseFloat(HUMminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                HUMaggregatedData[HUMformattedDate].HUMtotalValue += parseFloat(HUMminutes);
                HUMaggregatedData[HUMformattedDate].count++;
            }
        }
    });

    var HUMmaxResult = HUMfindMaxResult();
    var HUMchartData = HUMdateRange.map(HUMresultDate => {
        var HUMformattedDate = formatDateAsDMY(HUMresultDate);
        var HUMaggregatedDatum = HUMaggregatedData[HUMformattedDate];
        return HUMaggregatedDatum ? HUMaggregatedDatum.HUMtotalValue / HUMaggregatedDatum.count : 0;
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
var HUMnumberOfTests;
function HUMupdateOverview() {
    HUMnumberOfTests = 0;
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
    if (isPortuguese) {
        if (HUMnumberOfTests !== 0) {
            HUMinfoOverview.innerHTML = '';
            for (var i = 0; i < HUMinfoOverviewElements.length; i++) {
                HUMinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('HUMContainer').style.display = 'block';
            document.getElementById('HUMnumberOfSessions').value = HUMnumberOfTests + ' Sess\u00F5es';
            document.getElementById('HUMlongestRound').value = convertMinToMinSec(HUMmax) + ' ' + HUMintervals + ' rounds ' + formatDateAsDMY(HUMdateOfLongestResult);
            document.getElementById('HUMlatestRound').value = convertMinToMinSec(secondsToMinutes(HUMlatestResult)) + ' ' + HUMlastIntervals + ' rounds ' + formatDateAsDMY(HUMlastDate);
            document.getElementById('HUMaccordion').style.display = 'block';
        } else {
            document.getElementById('HUMaccordion').style.display = 'none';
            HUMinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
            for (var i = 0; i < HUMinfoOverviewElements.length; i++) {
                HUMinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('HUMContainer').style.display = 'none';
        }
    } else {
        if (HUMnumberOfTests !== 0) {
            HUMinfoOverview.innerHTML = '';
            for (var i = 0; i < HUMinfoOverviewElements.length; i++) {
                HUMinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('HUMContainer').style.display = 'block';
            document.getElementById('HUMnumberOfSessions').value = HUMnumberOfTests + ' Sessions';
            document.getElementById('HUMlongestRound').value = convertMinToMinSec(HUMmax) + ' ' + HUMintervals + ' rounds ' + formatDateAsDMY(HUMdateOfLongestResult);
            document.getElementById('HUMlatestRound').value = convertMinToMinSec(secondsToMinutes(HUMlatestResult)) + ' ' + HUMlastIntervals + ' rounds ' + formatDateAsDMY(HUMlastDate);
            document.getElementById('HUMaccordion').style.display = 'block';
        } else {
            document.getElementById('HUMaccordion').style.display = 'none';
            HUMinfoOverview.innerHTML = 'No results yet';
            for (var i = 0; i < HUMinfoOverviewElements.length; i++) {
                HUMinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('HUMContainer').style.display = 'none';
        }
    }
}
var HUMresultPage = document.getElementById('HUMresultPage'),
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
                    // Remove the deleted form
                    $('.HUMdelete-form [name="resultId"][value="' + resultId + '"]').closest('.HUMdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            HUMupdateChart(HUMstartDate, HUMendDate);
                            HUMupdateOverview();
                            openPage(HUMresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHUMresults.style.display = "none";
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
                if (isPortuguese) {
                    HUMresultDateHeader.innerHTML = 'Resultados do dia ' + HUMselectedDate;
                    HUMresultSessions.innerHTML += '<form method="post" class="HUMdelete-form">' +
                        '<div>Sess\u00E3o ' + HUMnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(HUMseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + HUMintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + HUMresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger HUMdelete-button" />' +
                        '</form>';
                } else {
                    HUMresultDateHeader.innerHTML = 'Results on ' + HUMselectedDate;
                    HUMresultSessions.innerHTML += '<form method="post" class="HUMdelete-form">' +
                        '<div>Session ' + HUMnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(HUMseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + HUMintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + HUMresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger HUMdelete-button" />' +
                        '</form>';
                }
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
    backHUMresults.style.display = "block";
    closeModalResults();
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
    if (isPortuguese) {
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
                    text: "Seus resultados do seu exerc\u00EDcio de Respira\u00E7\u00E3o Briza " + "(" + getYear(BBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Resultados do dia';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    else {
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
                    text: "Your Briza Breathing Exercise results " + "(" + getYear(BBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
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
                text: "Your Briza Breathing Exercise results " + "(" + getYear(BBendDate) + ")",
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
                        return 'Average Results on';
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
    
                            size: 10 // Change to your desired font size
                        },
                        fontColor: '#0661AA' // Change to your desired font color
                    },
                }],
                xAxes: [{
                    ticks: {
                        font: {
    
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
                        if (isPortuguese) {
                            BBchart.options.title.text = "Seus resultados do seu exerc\u00EDcio de Respira\u00E7\u00E3o Briza " + "(" + getYear(BBendDate) + ")";
                        } else {
                            BBchart.options.title.text = "Your Briza Breathing Exercise results " + "(" + getYear(BBendDate) + ")";
                        }
                    } else if (BBdelta < 0) {
                        if (formatDateAsDMY(BBendDate) == formatDateAsDMY(BBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BBendDate.setDate(BBendDate.getDate() + 1);
                            BBstartDate.setDate(BBstartDate.getDate() + 1);
                            if (isPortuguese) {
                                BBchart.options.title.text = "Seus resultados do seu exerc\u00EDcio de Respira\u00E7\u00E3o Briza " + "(" + getYear(BBendDate) + ")";
                            } else {
                                BBchart.options.title.text = "Your Briza Breathing Exercise results " + "(" + getYear(BBendDate) + ")";
                            }
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
            if (isPortuguese) {
                BBchart.options.title.text = "Seus resultados do seu exerc\u00EDcio de Respira\u00E7\u00E3o Briza " + "(" + getYear(BBendDate) + ")";
            } else {
                BBchart.options.title.text = "Your Briza Breathing Exercise results " + "(" + getYear(BBendDate) + ")";
            }
        } else if (BBdelta > 0) {
            if (formatDateAsDMY(BBendDate) == formatDateAsDMY(BBtoday)) { }
            else {
                // Scroll right, increase the date range
                BBendDate.setDate(BBendDate.getDate() + 1);
                BBstartDate.setDate(BBstartDate.getDate() + 1);
                if (isPortuguese) {
                    BBchart.options.title.text = "Seus resultados do seu exerc\u00EDcio de Respira\u00E7\u00E3o Briza " + "(" + getYear(BBendDate) + ")";
                } else {
                    BBchart.options.title.text = "Your Briza Breathing Exercise results " + "(" + getYear(BBendDate) + ")";
                }
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
                BBaggregatedData[BBformattedDate] = { BBtotalValue: parseFloat(BBminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                BBaggregatedData[BBformattedDate].BBtotalValue += parseFloat(BBminutes);
                BBaggregatedData[BBformattedDate].count++;
            }
        }
    });

    var BBmaxResult = BBfindMaxResult();
    var BBchartData = BBdateRange.map(BBresultDate => {
        var BBformattedDate = formatDateAsDMY(BBresultDate);
        var BBaggregatedDatum = BBaggregatedData[BBformattedDate];
        return BBaggregatedDatum ? BBaggregatedDatum.BBtotalValue / BBaggregatedDatum.count : 0;
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
var BBnumberOfTests;
function BBupdateOverview() {
    BBnumberOfTests = 0;
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
    if (isPortuguese) {
        if (BBnumberOfTests !== 0) {
            BBinfoOverview.innerHTML = '';
            for (var i = 0; i < BBinfoOverviewElements.length; i++) {
                BBinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('BBContainer').style.display = 'block';
            document.getElementById('BBnumberOfSessions').value = BBnumberOfTests + ' Sess\u00F5es';
            document.getElementById('BBlongestRound').value = convertMinToMinSec(BBmax) + ' ' + BBintervals + ' rounds ' + formatDateAsDMY(BBdateOfLongestResult);
            document.getElementById('BBlatestRound').value = convertMinToMinSec(secondsToMinutes(BBlatestResult)) + ' ' + BBlastIntervals + ' rounds ' + formatDateAsDMY(BBlastDate);
            document.getElementById('BBaccordion').style.display = 'block';
        } else {
            document.getElementById('BBaccordion').style.display = 'none';
            BBinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
            for (var i = 0; i < BBinfoOverviewElements.length; i++) {
                BBinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('BBContainer').style.display = 'none';
        }
    } else {
        if (BBnumberOfTests !== 0) {
            BBinfoOverview.innerHTML = '';
            for (var i = 0; i < BBinfoOverviewElements.length; i++) {
                BBinfoOverviewElements[i].style.display = 'grid';
            }
            document.getElementById('BBContainer').style.display = 'block';
            document.getElementById('BBnumberOfSessions').value = BBnumberOfTests + ' Sessions';
            document.getElementById('BBlongestRound').value = convertMinToMinSec(BBmax) + ' ' + BBintervals + ' rounds ' + formatDateAsDMY(BBdateOfLongestResult);
            document.getElementById('BBlatestRound').value = convertMinToMinSec(secondsToMinutes(BBlatestResult)) + ' ' + BBlastIntervals + ' rounds ' + formatDateAsDMY(BBlastDate);
            document.getElementById('BBaccordion').style.display = 'block';
        } else {
            document.getElementById('BBaccordion').style.display = 'none';
            BBinfoOverview.innerHTML = 'No results yet';
            for (var i = 0; i < BBinfoOverviewElements.length; i++) {
                BBinfoOverviewElements[i].style.display = 'none';
            }
            document.getElementById('BBContainer').style.display = 'none';
        }
    }
}
var BBresultPage = document.getElementById('BBresultPage'),
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
                    // Remove the deleted form
                    $('.BBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BBupdateChart(BBstartDate, BBendDate);
                            BBupdateOverview();
                            openPage(BBresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBBresults.style.display = "none";
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
                if (isPortuguese) {
                    BBresultDateHeader.innerHTML = 'Resultados do dia ' + BBselectedDate;
                    BBresultSessions.innerHTML += '<form method="post" class="BBdelete-form">' +
                        '<div>Sess\u00E3o ' + BBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(BBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + BBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger BBdelete-button" />' +
                        '</form>';
                } else {
                    BBresultDateHeader.innerHTML = 'Results on ' + BBselectedDate;
                    BBresultSessions.innerHTML += '<form method="post" class="BBdelete-form">' +
                        '<div>Session ' + BBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(BBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + BBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger BBdelete-button" />' +
                        '</form>';
                }
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
    backBBresults.style.display = "block";
    closeModalResults();
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
    if (isPortuguese) {
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
                    text: "Seus resultados de Treinamento de Apneia " + "(" + getYear(APendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Resultados do dia ';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
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
                    text: "Your Apnea Training results " + "(" + getYear(APendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }

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
                        if (isPortuguese) {
                            APchart.options.title.text = "Seus resultados de Treinamento de Apneia " + "(" + getYear(APendDate) + ")";
                        } else {
                            APchart.options.title.text = "Your Apnea Training results " + "(" + getYear(APendDate) + ")";
                        }
                    } else if (APdelta < 0) {
                        if (formatDateAsDMY(APendDate) == formatDateAsDMY(APtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            APendDate.setDate(APendDate.getDate() + 1);
                            APstartDate.setDate(APstartDate.getDate() + 1);
                            if (isPortuguese) {
                                APchart.options.title.text = "Seus resultados de Treinamento de Apneia " + "(" + getYear(APendDate) + ")";
                            } else {
                                APchart.options.title.text = "Your Apnea Training results " + "(" + getYear(APendDate) + ")";
                            }
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
            if (isPortuguese) {
                APchart.options.title.text = "Seus resultados de Treinamento de Apneia " + "(" + getYear(APendDate) + ")";
            } else {
                APchart.options.title.text = "Your Apnea Training results " + "(" + getYear(APendDate) + ")";
            }
        } else if (APdelta > 0) {
            if (formatDateAsDMY(APendDate) == formatDateAsDMY(APtoday)) { }
            else {
                // Scroll right, increase the date range
                APendDate.setDate(APendDate.getDate() + 1);
                APstartDate.setDate(APstartDate.getDate() + 1);
                if (isPortuguese) {
                    APchart.options.title.text = "Seus resultados de Treinamento de Apneia " + "(" + getYear(APendDate) + ")";
                } else {
                    APchart.options.title.text = "Your Apnea Training results " + "(" + getYear(APendDate) + ")";
                }
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
                APaggregatedData[APformattedDate] = { APtotalValue: parseFloat(APminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                APaggregatedData[APformattedDate].APtotalValue += parseFloat(APminutes);
                APaggregatedData[APformattedDate].count++;
            }
        }
    });

    var APmaxResult = APfindMaxResult();
    var APchartData = APdateRange.map(APresultDate => {
        var APformattedDate = formatDateAsDMY(APresultDate);
        var APaggregatedDatum = APaggregatedData[APformattedDate];
        return APaggregatedDatum ? APaggregatedDatum.APtotalValue / APaggregatedDatum.count : 0;
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
var APnumberOfTests;
function APupdateOverview() {
    APnumberOfTests = 0;
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
            APinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('APContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('APnumberOfSessions').value = APnumberOfTests + ' Sess\u00F5es';

        } else {
            document.getElementById('APnumberOfSessions').value = APnumberOfTests + ' Sessions';
        }
        document.getElementById('APlongestRound').value = convertMinToMinSec(APmax) + ' ' + APintervals + ' rounds ' + formatDateAsDMY(APdateOfLongestResult);
        document.getElementById('APlatestRound').value = convertMinToMinSec(secondsToMinutes(APlatestResult)) + ' ' + APlastIntervals + ' rounds ' + formatDateAsDMY(APlastDate);
        document.getElementById('APaccordion').style.display = 'block';
    } else {
        document.getElementById('APaccordion').style.display = 'none';
        if (isPortuguese) {
            APinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';

        } else {
            APinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < APinfoOverviewElements.length; i++) {
            APinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('APContainer').style.display = 'none';
    }
}
var APresultPage = document.getElementById('APresultPage'),
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
                    // Remove the deleted form
                    $('.APdelete-form [name="resultId"][value="' + resultId + '"]').closest('.APdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            APupdateChart(APstartDate, APendDate);
                            APupdateOverview();
                            openPage(APresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backAPresults.style.display = "none";
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
                APresultDateHeader.innerHTML = 'Resultados do dia ' + APselectedDate;
                if (isPortuguese) {
                    APresultSessions.innerHTML += '<form method="post" class="APdelete-form">' +
                        '<div>Sess\u00E3o ' + APnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(APseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + APintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + APresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger APdelete-button" />' +
                        '</form>';
                } else {
                    APresultSessions.innerHTML += '<form method="post" class="APdelete-form">' +
                        '<div>Session ' + APnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(APseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + APintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + APresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger APdelete-button" />' +
                        '</form>';
                }
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
    backAPresults.style.display = "block";
    closeModalResults();
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
    if (isPortuguese) {
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
                    text: "Seus resultados de Treinamento de Tolerāncia ao CO2 " + "(" + getYear(CTendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'M\u00E9dia do dia ';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
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
                    text: "Your CO2 tolerance2 Training results " + "(" + getYear(CTendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
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
                        if (isPortuguese) {
                            CTchart.options.title.text = "Seus resultados de Treinamento de Tolerāncia ao CO2 " + "(" + getYear(CTendDate) + ")";
                        } else {
                            CTchart.options.title.text = "Your CO2 tolerance2 Training results " + "(" + getYear(CTendDate) + ")";
                        }
                    } else if (CTdelta < 0) {
                        if (formatDateAsDMY(CTendDate) == formatDateAsDMY(CTtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            CTendDate.setDate(CTendDate.getDate() + 1);
                            CTstartDate.setDate(CTstartDate.getDate() + 1);
                            if (isPortuguese) {
                                CTchart.options.title.text = "Seus resultados de Treinamento de Tolerāncia ao CO2 " + "(" + getYear(CTendDate) + ")";
                            } else {
                                CTchart.options.title.text = "Your CO2 tolerance2 Training results " + "(" + getYear(CTendDate) + ")";
                            }
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
            if (isPortuguese) {
                CTchart.options.title.text = "Seus resultados de Treinamento de Tolerāncia ao CO2 " + "(" + getYear(CTendDate) + ")";
            } else {
                CTchart.options.title.text = "Your CO2 tolerance2 Training results " + "(" + getYear(CTendDate) + ")";
            }
        } else if (CTdelta > 0) {
            if (formatDateAsDMY(CTendDate) == formatDateAsDMY(CTtoday)) { }
            else {
                // Scroll right, increase the date range
                CTendDate.setDate(CTendDate.getDate() + 1);
                CTstartDate.setDate(CTstartDate.getDate() + 1);
                if (isPortuguese) {
                    CTchart.options.title.text = "Seus resultados de Treinamento de Tolerāncia ao CO2 " + "(" + getYear(CTendDate) + ")";
                } else {
                    CTchart.options.title.text = "Your CO2 tolerance2 Training results " + "(" + getYear(CTendDate) + ")";
                }
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
                CTaggregatedData[CTformattedDate] = { CTtotalValue: parseFloat(CTminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                CTaggregatedData[CTformattedDate].CTtotalValue += parseFloat(CTminutes);
                CTaggregatedData[CTformattedDate].count++;
            }
        }
    });

    var CTmaxResult = CTfindMaxResult();
    var CTchartData = CTdateRange.map(CTresultDate => {
        var CTformattedDate = formatDateAsDMY(CTresultDate);
        var CTaggregatedDatum = CTaggregatedData[CTformattedDate];
        return CTaggregatedDatum ? CTaggregatedDatum.CTtotalValue / CTaggregatedDatum.count : 0;
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
var CTnumberOfTests;
function CTupdateOverview() {
    CTnumberOfTests = 0;
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
            CTinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('CTContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('CTnumberOfSessions').value = CTnumberOfTests + ' Sess\u00F5es';
        } else {
            document.getElementById('CTnumberOfSessions').value = CTnumberOfTests + ' Sessions';
        }
        document.getElementById('CTlongestRound').value = convertMinToMinSec(CTmax) + ' ' + CTintervals + ' rounds ' + formatDateAsDMY(CTdateOfLongestResult);
        document.getElementById('CTlatestRound').value = convertMinToMinSec(secondsToMinutes(CTlatestResult)) + ' ' + CTlastIntervals + ' rounds ' + formatDateAsDMY(CTlastDate);
        document.getElementById('CTaccordion').style.display = 'block';
    } else {
        document.getElementById('CTaccordion').style.display = 'none';
        if (isPortuguese) {
            CTinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            CTinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < CTinfoOverviewElements.length; i++) {
            CTinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('CTContainer').style.display = 'none';
    }
}
var CTresultPage = document.getElementById('CTresultPage'),
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
                    // Remove the deleted form
                    $('.CTdelete-form [name="resultId"][value="' + resultId + '"]').closest('.CTdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            CTupdateChart(CTstartDate, CTendDate);
                            CTupdateOverview();
                            openPage(CTresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backCTresults.style.display = "none";
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
                if (isPortuguese) {
                    CTresultDateHeader.innerHTML = 'Resultados do dia ' + CTselectedDate;
                    CTresultSessions.innerHTML += '<form method="post" class="CTdelete-form">' +
                        '<div>Sess\u00E3o ' + CTnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(CTseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + CTintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + CTresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger CTdelete-button" />' +
                        '</form>';
                } else {
                    CTresultDateHeader.innerHTML = 'Results on ' + CTselectedDate;
                    CTresultSessions.innerHTML += '<form method="post" class="CTdelete-form">' +
                        '<div>Session ' + CTnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(CTseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + CTintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + CTresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger CTdelete-button" />' +
                        '</form>';
                }
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
    backCTresults.style.display = "block";
    closeModalResults();
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
    if (isPortuguese) {
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
                    text: "Seus resultados de Respira\u00E7\u00E3o da Caixa " + "(" + getYear(BOXendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'M\u00E9dia do dia';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
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
                    text: "Your Box Breathing results " + "(" + getYear(BOXendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
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
                        if (isPortuguese) {
                            BOXchart.options.title.text = "Seus resultados de Respira\u00E7\u00E3o da Caixa " + "(" + getYear(BOXendDate) + ")";
                        } else {
                            BOXchart.options.title.text = "Your Box Breathing results " + "(" + getYear(BOXendDate) + ")";
                        }
                    } else if (BOXdelta < 0) {
                        if (formatDateAsDMY(BOXendDate) == formatDateAsDMY(BOXtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            BOXendDate.setDate(BOXendDate.getDate() + 1);
                            BOXstartDate.setDate(BOXstartDate.getDate() + 1);
                            if (isPortuguese) {
                                BOXchart.options.title.text = "Seus resultados de Respira\u00E7\u00E3o da Caixa " + "(" + getYear(BOXendDate) + ")";
                            } else {
                                BOXchart.options.title.text = "Your Box Breathing results " + "(" + getYear(BOXendDate) + ")";
                            }
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
            if (isPortuguese) {
                BOXchart.options.title.text = "Seus resultados de Respira\u00E7\u00E3o da Caixa " + "(" + getYear(BOXendDate) + ")";
            } else {
                BOXchart.options.title.text = "Your Box Breathing results " + "(" + getYear(BOXendDate) + ")";
            }
        } else if (BOXdelta > 0) {
            if (formatDateAsDMY(BOXendDate) == formatDateAsDMY(BOXtoday)) { }
            else {
                // Scroll right, increase the date range
                BOXendDate.setDate(BOXendDate.getDate() + 1);
                BOXstartDate.setDate(BOXstartDate.getDate() + 1);
                if (isPortuguese) {
                    BOXchart.options.title.text = "Seus resultados de Respira\u00E7\u00E3o da Caixa " + "(" + getYear(BOXendDate) + ")";
                } else {
                    BOXchart.options.title.text = "Your Box Breathing results " + "(" + getYear(BOXendDate) + ")";
                }
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
                BOXaggregatedData[BOXformattedDate] = { BOXtotalValue: parseFloat(BOXminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                BOXaggregatedData[BOXformattedDate].BOXtotalValue += parseFloat(BOXminutes);
                BOXaggregatedData[BOXformattedDate].count++;
            }
        }
    });

    var BOXmaxResult = BOXfindMaxResult();
    var BOXchartData = BOXdateRange.map(BOXresultDate => {
        var BOXformattedDate = formatDateAsDMY(BOXresultDate);
        var BOXaggregatedDatum = BOXaggregatedData[BOXformattedDate];
        return BOXaggregatedDatum ? BOXaggregatedDatum.BOXtotalValue / BOXaggregatedDatum.count : 0;
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
var BOXnumberOfTests;
function BOXupdateOverview() {
    BOXnumberOfTests = 0;
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
            BOXinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('BOXContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('BOXnumberOfSessions').value = BOXnumberOfTests + ' Sess\u00F5es';
        } else {
            document.getElementById('BOXnumberOfSessions').value = BOXnumberOfTests + ' Sessions';
        }
        document.getElementById('BOXlongestRound').value = convertMinToMinSec(BOXmax) + ' ' + BOXintervals + ' rounds ' + formatDateAsDMY(BOXdateOfLongestResult);
        document.getElementById('BOXlatestRound').value = convertMinToMinSec(secondsToMinutes(BOXlatestResult)) + ' ' + BOXlastIntervals + ' rounds ' + formatDateAsDMY(BOXlastDate);
        document.getElementById('BOXaccordion').style.display = 'block';
    } else {
        document.getElementById('BOXaccordion').style.display = 'none';
        if (isPortuguese) {
            BOXinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            BOXinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < BOXinfoOverviewElements.length; i++) {
            BOXinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('BOXContainer').style.display = 'none';
    }
}
var BOXresultPage = document.getElementById('BOXresultPage'),
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
                    // Remove the deleted form
                    $('.BOXdelete-form [name="resultId"][value="' + resultId + '"]').closest('.BOXdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            BOXupdateChart(BOXstartDate, BOXendDate);
                            BOXupdateOverview();
                            openPage(BOXresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backBOXresults.style.display = "none";
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
                if (isPortuguese) {
                    BOXresultDateHeader.innerHTML = 'Resultados do dia ' + BOXselectedDate;
                    BOXresultSessions.innerHTML += '<form method="post" class="BOXdelete-form">' +
                        '<div>Sess\u00E3o ' + BOXnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(BOXseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + BOXintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BOXresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger BOXdelete-button" />' +
                        '</form>';
                } else {
                    BOXresultDateHeader.innerHTML = 'Results on ' + BOXselectedDate;
                    BOXresultSessions.innerHTML += '<form method="post" class="BOXdelete-form">' +
                        '<div>Session ' + BOXnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(BOXseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + BOXintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + BOXresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger BOXdelete-button" />' +
                        '</form>';
                }
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
    backBOXresults.style.display = "block";
    closeModalResults();
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
    if (isPortuguese) {
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
                    text: "Seus resultados da Respira\u00E7\u00E3o Ujjayi " + "(" + getYear(UBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'M\u00E9dia do dia';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
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
                    text: "Your Ujjayi Breathing results " + "(" + getYear(UBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
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
                        if (isPortuguese) {
                            UBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Ujjay " + "(" + getYear(UBendDate) + ")";
                        } else {
                            UBchart.options.title.text = "Your Ujjayi Breathing results " + "(" + getYear(UBendDate) + ")";
                        }
                    } else if (UBdelta < 0) {
                        if (formatDateAsDMY(UBendDate) == formatDateAsDMY(UBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            UBendDate.setDate(UBendDate.getDate() + 1);
                            UBstartDate.setDate(UBstartDate.getDate() + 1);
                            if (isPortuguese) {
                                UBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Ujjay " + "(" + getYear(UBendDate) + ")";
                            } else {
                                UBchart.options.title.text = "Your Ujjayi Breathing results " + "(" + getYear(UBendDate) + ")";
                            }
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
            if (isPortuguese) {
                UBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Ujjay " + "(" + getYear(UBendDate) + ")";
            } else {
                UBchart.options.title.text = "Your Ujjayi Breathing results " + "(" + getYear(UBendDate) + ")";
            }
        } else if (UBdelta > 0) {
            if (formatDateAsDMY(UBendDate) == formatDateAsDMY(UBtoday)) { }
            else {
                // Scroll right, increase the date range
                UBendDate.setDate(UBendDate.getDate() + 1);
                UBstartDate.setDate(UBstartDate.getDate() + 1);
                if (isPortuguese) {
                    UBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Ujjay " + "(" + getYear(UBendDate) + ")";
                } else {
                    UBchart.options.title.text = "Your Ujjayi Breathing results " + "(" + getYear(UBendDate) + ")";
                }
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
                UBaggregatedData[UBformattedDate] = { UBtotalValue: parseFloat(UBminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                UBaggregatedData[UBformattedDate].UBtotalValue += parseFloat(UBminutes);
                UBaggregatedData[UBformattedDate].count++;
            }
        }
    });

    var UBmaxResult = UBfindMaxResult();
    var UBchartData = UBdateRange.map(UBresultDate => {
        var UBformattedDate = formatDateAsDMY(UBresultDate);
        var UBaggregatedDatum = UBaggregatedData[UBformattedDate];
        return UBaggregatedDatum ? UBaggregatedDatum.UBtotalValue / UBaggregatedDatum.count : 0;
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
var UBnumberOfTests;
function UBupdateOverview() {
    UBnumberOfTests = 0;
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
            UBinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('UBContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('UBnumberOfSessions').value = UBnumberOfTests + ' Sess\u00F5es';
        } else {
            document.getElementById('UBnumberOfSessions').value = UBnumberOfTests + ' Sessions';
        }
        document.getElementById('UBlongestRound').value = convertMinToMinSec(UBmax) + ' ' + UBintervals + ' rounds ' + formatDateAsDMY(UBdateOfLongestResult);
        document.getElementById('UBlatestRound').value = convertMinToMinSec(secondsToMinutes(UBlatestResult)) + ' ' + UBlastIntervals + ' rounds ' + formatDateAsDMY(UBlastDate);
        document.getElementById('UBaccordion').style.display = 'block';
    } else {
        document.getElementById('UBaccordion').style.display = 'none';
        if (isPortuguese) {
            UBinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            UBinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < UBinfoOverviewElements.length; i++) {
            UBinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('UBContainer').style.display = 'none';
    }
}
var UBresultPage = document.getElementById('UBresultPage'),
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
                    // Remove the deleted form
                    $('.UBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.UBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            UBupdateChart(UBstartDate, UBendDate);
                            UBupdateOverview();
                            openPage(UBresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backUBresults.style.display = "none";
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
                if (isPortuguese) {
                    UBresultDateHeader.innerHTML = 'Resultados do dia ' + UBselectedDate;
                    UBresultSessions.innerHTML += '<form method="post" class="UBdelete-form">' +
                        '<div>Sess\u00E3o ' + UBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(UBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + UBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + UBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger UBdelete-button" />' +
                        '</form>';
                } else {
                    UBresultDateHeader.innerHTML = 'Results on ' + UBselectedDate;
                    UBresultSessions.innerHTML += '<form method="post" class="UBdelete-form">' +
                        '<div>Session ' + UBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(UBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + UBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + UBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger UBdelete-button" />' +
                        '</form>';
                }
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
    backUBresults.style.display = "block";
    closeModalResults();
}
// END UB
// NB
// Initialize startDate and endDate
var NBtoday = new Date();
var NBlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var NBresultDate = new Date(NBtoday);
    NBresultDate.setDate(NBtoday.getDate() - i);
    NBlast7Dates.push(NBresultDate); // Push the Date object directly
}

var NBendDate = NBlast7Dates[NBlast7Dates.length - 1]; // Initialize with the latest date
var NBstartDate = NBlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var NBtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var NBContainer = document.getElementById('NBContainer');
NBContainer.addEventListener('touchstart', function (event) {
    NBtouchStartX = event.touches[0].clientX;
});

var NBscrollThreshold = 10; // Adjust this value to control the scroll threshold

var NBlastScrollX = null;
var { NBchartData, NBmaxYValue, NBselectedDataDatesYear } = NBupdateChartData(NBstartDate, NBendDate, fetchedDataArray);
var NBinfoOverview = document.getElementById('NBinfoOverview');
var NBdateOfLongestResult;
var NBlastIntervals;
var NBintervals;
var NBlastDate;
var NBlatestResult;
var NBchart;
function NBinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var NBdateA = new Date(a.NBresultDate);
        var NBdateB = new Date(b.NBresultDate);
        return NBdateA - NBdateB;
    });
    var NBselectedDataDatesMonthDay = NBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        NBchart = new Chart("NBchart", {
            type: "bar",
            data: {
                labels: NBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: NBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados da Respira\u00E7\u00E3o Nadi Shodhana " + "(" + getYear(NBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'M\u00E9dia do dia';
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
                            max: NBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        NBchart = new Chart("NBchart", {
            type: "bar",
            data: {
                labels: NBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: NBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your Nadi Shodhana Breathing results " + "(" + getYear(NBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
                            max: NBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    NBContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (NBtouchStartX !== null) {
            var NBtouchMoveX = event.touches[0].clientX;

            if (NBlastScrollX !== null) {
                var NBdelta = NBtouchMoveX - NBlastScrollX;

                if (Math.abs(NBdelta) >= NBscrollThreshold) {
                    NBlastScrollX = NBtouchMoveX;

                    if (NBdelta > 0) {
                        // Scroll right, decrease the date range
                        NBendDate.setDate(NBendDate.getDate() - 1);
                        NBstartDate.setDate(NBstartDate.getDate() - 1);
                        if (isPortuguese) {
                            NBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Nadi Shodhana " + "(" + getYear(NBendDate) + ")";
                        } else {
                            NBchart.options.title.text = "Your Nadi Shodhana Breathing results " + "(" + getYear(NBendDate) + ")";
                        }
                    } else if (NBdelta < 0) {
                        if (formatDateAsDMY(NBendDate) == formatDateAsDMY(NBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            NBendDate.setDate(NBendDate.getDate() + 1);
                            NBstartDate.setDate(NBstartDate.getDate() + 1);
                            if (isPortuguese) {
                                NBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Nadi Shodhana " + "(" + getYear(NBendDate) + ")";
                            } else {
                                NBchart.options.title.text = "Your Nadi Shodhana Breathing results " + "(" + getYear(NBendDate) + ")";
                            }
                        }
                    }
                    NBupdateChart(NBstartDate, NBendDate);
                }
            } else {
                NBlastScrollX = NBtouchMoveX;
            }
        }
    });

    NBContainer.addEventListener('touchend', function () {
        NBlastScrollX = null;
    });
    NBContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var NBdelta = event.deltaX * 0.1;

        if (NBdelta < 0) {
            // Scroll left, decrease the date range
            NBendDate.setDate(NBendDate.getDate() - 1);
            NBstartDate.setDate(NBstartDate.getDate() - 1);
            if (isPortuguese) {
                NBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Nadi Shodhana " + "(" + getYear(NBendDate) + ")";
            } else {
                NBchart.options.title.text = "Your Nadi Shodhana Breathing results " + "(" + getYear(NBendDate) + ")";
            }
        } else if (NBdelta > 0) {
            if (formatDateAsDMY(NBendDate) == formatDateAsDMY(NBtoday)) { }
            else {
                // Scroll right, increase the date range
                NBendDate.setDate(NBendDate.getDate() + 1);
                NBstartDate.setDate(NBstartDate.getDate() + 1);
                if (isPortuguese) {
                    NBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Nadi Shodhana " + "(" + getYear(NBendDate) + ")";
                } else {
                    NBchart.options.title.text = "Your Nadi Shodhana Breathing results " + "(" + getYear(NBendDate) + ")";
                }
            }
        }
        NBupdateChart(NBstartDate, NBendDate);
    });
    NBupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function NBhandleBarClick(event, array) {
        var NBindex = array[0]._index; // Get the clicked bar index
        var NBselectedDate = NBselectedDataDatesYear[NBindex];
        NBdisplayDetailedInfo(NBselectedDate);
    }
    NBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            NBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        NBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                NBhandleBarClick(event, array);
            }
        };
    }
}

function NBfindMaxResult() {
    var NBmaxResult = 0;

    fetchedDataArray.forEach(NBresultData => {
        var NBtimeString = NBresultData.nbTotalTime;

        // Check if the timeString is not empty before parsing
        if (NBtimeString !== undefined && NBtimeString !== '' && NBtimeString !== null) {
            var seconds = parseTimeToSeconds2(NBtimeString);
            NBmaxResult = Math.max(NBmaxResult, secondsToMinutes(seconds));
        }
    });
    return NBmaxResult;
}
function NBfindMaxResult2() {
    var NBmaxResult = 0;

    fetchedDataArray.forEach(NBresultData => {
        var NBtimeString = NBresultData.nbTotalTime;

        // Check if the timeString is not empty before parsing
        if (NBtimeString !== undefined && NBtimeString !== '' && NBtimeString !== null) {
            var seconds = parseTimeToSeconds2(NBtimeString);
            NBmaxResult = Math.max(NBmaxResult, seconds);
        }
    });
    return NBmaxResult;
}
function NBupdateChartData(NBstartDate, NBendDate) {
    var NBdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var NBcurrentDate = new Date(NBstartDate);
    while (NBcurrentDate <= NBendDate) {
        NBdateRange.push(new Date(NBcurrentDate));
        NBcurrentDate.setDate(NBcurrentDate.getDate() + 1); // Move to the next day
    }

    var NBaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(NBresultData => {
        var NBresultDate = new Date(NBresultData.nbResultDate);
        var NBseconds;
        var NBminutes;
        var NBtimeString = NBresultData.nbTotalTime;
        if (NBtimeString !== undefined && NBtimeString !== '' && NBtimeString !== null) {
            NBseconds = parseTimeToSeconds2(NBtimeString);
            NBminutes = secondsToMinutes(NBseconds);
        } else {
            NBminutes = 0;
        }
        if (!isNaN(NBresultDate.getTime())) {
            var NBformattedDate = formatDateAsDMY(NBresultDate);

            if (!NBaggregatedData[NBformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                NBaggregatedData[NBformattedDate] = { NBtotalValue: parseFloat(NBminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                NBaggregatedData[NBformattedDate].NBtotalValue += parseFloat(NBminutes);
                NBaggregatedData[NBformattedDate].count++;
            }
        }
    });

    var NBmaxResult = NBfindMaxResult();
    var NBchartData = NBdateRange.map(NBresultDate => {
        var NBformattedDate = formatDateAsDMY(NBresultDate);
        var NBaggregatedDatum = NBaggregatedData[NBformattedDate];
        return NBaggregatedDatum ? NBaggregatedDatum.NBtotalValue / NBaggregatedDatum.count : 0;
    });

    return {
        NBchartData: NBchartData,
        NBmaxYValue: Math.floor(NBmaxResult + 2),
        NBselectedDataDatesYear: NBdateRange.map(formatDateAsDMY)
    };
}
function NBupdateChart(NBstartDate, NBendDate) {
    var { NBchartData, NBmaxYValue, NBselectedDataDatesYear } = NBupdateChartData(NBstartDate, NBendDate);

    // Update x-axis labels and chart data
    var NBselectedDataDatesMonthDay = NBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    NBchart.data.labels = NBselectedDataDatesMonthDay;
    NBchart.data.datasets[0].data = NBchartData;
    NBchart.options.scales.yAxes[0].ticks.max = NBmaxYValue;
    function NBhandleBarClick(event, array) {
        var NBindex = array[0]._index; // Get the clicked bar index
        var NBselectedDate = NBselectedDataDatesYear[NBindex];
        NBdisplayDetailedInfo(NBselectedDate);
    }
    NBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            NBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        NBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                NBhandleBarClick(event, array);
            }
        };
    }
    NBchart.update();
}
var NBnumberOfTests;
function NBupdateOverview() {
    NBnumberOfTests = 0;
    var NBmax = NBfindMaxResult();
    var NBmax2 = NBfindMaxResult2();
    var NBinfoOverviewElements = document.getElementsByClassName('NBinfoOverview');
    fetchedDataArray.forEach(NBresultData => {
        var NBtimeString = NBresultData.nbTotalTime;
        var NBdateString = NBresultData.nbResultDate;
        var NBrounds = NBresultData.nbIntervals;
        // Check if the timeString is not empty before parsing
        if (NBtimeString !== undefined && NBtimeString !== '' && NBtimeString !== null) {
            var NBseconds = parseTimeToSeconds2(NBtimeString);
            // Store the value of dateOfLongestResult when NBmax is updated
            if (NBseconds === NBmax2) {
                NBdateOfLongestResult = NBdateString;
                NBintervals = NBrounds;
            }
            NBlatestResult = parseTimeToSeconds2(NBtimeString);
            NBlastDate = NBdateString;
            NBlastIntervals = NBrounds;
            NBnumberOfTests++;
        }
    });
    if (NBnumberOfTests !== 0) {
        NBinfoOverview.innerHTML = '';
        for (var i = 0; i < NBinfoOverviewElements.length; i++) {
            NBinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('NBContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('NBnumberOfSessions').value = NBnumberOfTests + ' Sess\u00F5es';
        } else {
            document.getElementById('NBnumberOfSessions').value = NBnumberOfTests + ' Sessions';
        }
        document.getElementById('NBlongestRound').value = convertMinToMinSec(NBmax) + ' ' + NBintervals + ' rounds ' + formatDateAsDMY(NBdateOfLongestResult);
        document.getElementById('NBlatestRound').value = convertMinToMinSec(secondsToMinutes(NBlatestResult)) + ' ' + NBlastIntervals + ' rounds ' + formatDateAsDMY(NBlastDate);
        document.getElementById('NBaccordion').style.display = 'block';
    } else {
        document.getElementById('NBaccordion').style.display = 'none';
        if (isPortuguese) {
            NBinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            NBinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < NBinfoOverviewElements.length; i++) {
            NBinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('NBContainer').style.display = 'none';
    }
}
var NBresultPage = document.getElementById('NBresultPage'),
    NBresultDateHeader = document.getElementById('NBresultDateHeader'),
    NBresultSessions = document.getElementById('NBresultSessions');

function NBdisplayDetailedInfo(NBselectedDate) {
    function NBdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.NBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.NBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            NBupdateChart(NBstartDate, NBendDate);
                            NBupdateOverview();
                            openPage(NBresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backNBresults.style.display = "none";
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
    var NBnumberOfResults = 1;
    NBresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(NBresultData => {
        var NBtimeString = NBresultData.nbTotalTime;
        var NBdateString = NBresultData.nbResultDate;
        var NBresultId = NBresultData.resultId;
        NBintervals = NBresultData.nbIntervals;
        // Check if the timeString is not empty before parsing
        if (NBtimeString !== undefined && NBtimeString !== '' && NBtimeString !== null) {
            var NBseconds = parseTimeToSeconds2(NBtimeString);
            // Store the value of dateOfLongestResult when NBmax is updated
            if (NBselectedDate === formatDateAsDMY(NBdateString)) {
                if (isPortuguese) {
                    NBresultDateHeader.innerHTML = 'Resultados do dia ' + NBselectedDate;
                    NBresultSessions.innerHTML += '<form method="post" class="NBdelete-form">' +
                        '<div>Sess\u00E3o ' + NBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(NBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + NBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + NBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger NBdelete-button" />' +
                        '</form>';
                } else {
                    NBresultDateHeader.innerHTML = 'Results on ' + NBselectedDate;
                    NBresultSessions.innerHTML += '<form method="post" class="NBdelete-form">' +
                        '<div>Session ' + NBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(NBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + NBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + NBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger NBdelete-button" />' +
                        '</form>';
                }
                NBnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var NBdeleteButtons = document.querySelectorAll('.NBdelete-button');
    NBdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var NBform = this.closest('.NBdelete-form');
            var NBresultId = NBform.querySelector('[name="resultId"]').value;
            NBdeleteResult(NBresultId);
        });
    });

    openPage(resultsPage, NBresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backNBresults.style.display = "block";
    closeModalResults();
}
// END NB
// SB
// Initialize startDate and endDate
var SBtoday = new Date();
var SBlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var SBresultDate = new Date(SBtoday);
    SBresultDate.setDate(SBtoday.getDate() - i);
    SBlast7Dates.push(SBresultDate); // Push the Date object directly
}

var SBendDate = SBlast7Dates[SBlast7Dates.length - 1]; // Initialize with the latest date
var SBstartDate = SBlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var SBtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var SBContainer = document.getElementById('SBContainer');
SBContainer.addEventListener('touchstart', function (event) {
    SBtouchStartX = event.touches[0].clientX;
});

var SBscrollThreshold = 10; // Adjust this value to control the scroll threshold

var SBlastScrollX = null;
var { SBchartData, SBmaxYValue, SBselectedDataDatesYear } = SBupdateChartData(SBstartDate, SBendDate, fetchedDataArray);
var SBinfoOverview = document.getElementById('SBinfoOverview');
var SBdateOfLongestResult;
var SBlastIntervals;
var SBintervals;
var SBlastDate;
var SBlatestResult;
var SBchart;
function SBinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var SBdateA = new Date(a.SBresultDate);
        var SBdateB = new Date(b.SBresultDate);
        return SBdateA - SBdateB;
    });
    var SBselectedDataDatesMonthDay = SBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        SBchart = new Chart("SBchart", {
            type: "bar",
            data: {
                labels: SBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: SBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados da Respira\u00E7\u00E3o Sitali " + "(" + getYear(SBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'M\u00E9dia do dia';
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
                            max: SBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        SBchart = new Chart("SBchart", {
            type: "bar",
            data: {
                labels: SBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: SBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your Sitali Breathing results " + "(" + getYear(SBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
                            max: SBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    SBContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (SBtouchStartX !== null) {
            var SBtouchMoveX = event.touches[0].clientX;

            if (SBlastScrollX !== null) {
                var SBdelta = SBtouchMoveX - SBlastScrollX;

                if (Math.abs(SBdelta) >= SBscrollThreshold) {
                    SBlastScrollX = SBtouchMoveX;

                    if (SBdelta > 0) {
                        // Scroll right, decrease the date range
                        SBendDate.setDate(SBendDate.getDate() - 1);
                        SBstartDate.setDate(SBstartDate.getDate() - 1);
                        if (isPortuguese) {
                            SBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Sitali " + "(" + getYear(SBendDate) + ")";
                        } else {
                            SBchart.options.title.text = "Your Sitali Breathing results " + "(" + getYear(SBendDate) + ")";
                        }
                    } else if (SBdelta < 0) {
                        if (formatDateAsDMY(SBendDate) == formatDateAsDMY(SBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            SBendDate.setDate(SBendDate.getDate() + 1);
                            SBstartDate.setDate(SBstartDate.getDate() + 1);
                            if (isPortuguese) {
                                SBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Sitali " + "(" + getYear(SBendDate) + ")";
                            } else {
                                SBchart.options.title.text = "Your Sitali Breathing results " + "(" + getYear(SBendDate) + ")";
                            }
                        }
                    }
                    SBupdateChart(SBstartDate, SBendDate);
                }
            } else {
                SBlastScrollX = SBtouchMoveX;
            }
        }
    });

    SBContainer.addEventListener('touchend', function () {
        SBlastScrollX = null;
    });
    SBContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var SBdelta = event.deltaX * 0.1;

        if (SBdelta < 0) {
            // Scroll left, decrease the date range
            SBendDate.setDate(SBendDate.getDate() - 1);
            SBstartDate.setDate(SBstartDate.getDate() - 1);
            if (isPortuguese) {
                SBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Sitali " + "(" + getYear(SBendDate) + ")";
            } else {
                SBchart.options.title.text = "Your Sitali Breathing results " + "(" + getYear(SBendDate) + ")";
            }
        } else if (SBdelta > 0) {
            if (formatDateAsDMY(SBendDate) == formatDateAsDMY(SBtoday)) { }
            else {
                // Scroll right, increase the date range
                SBendDate.setDate(SBendDate.getDate() + 1);
                SBstartDate.setDate(SBstartDate.getDate() + 1);
                if (isPortuguese) {
                    SBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Sitali " + "(" + getYear(SBendDate) + ")";
                } else {
                    SBchart.options.title.text = "Your Sitali Breathing results " + "(" + getYear(SBendDate) + ")";
                }
            }
        }
        SBupdateChart(SBstartDate, SBendDate);
    });
    SBupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function SBhandleBarClick(event, array) {
        var SBindex = array[0]._index; // Get the clicked bar index
        var SBselectedDate = SBselectedDataDatesYear[SBindex];
        SBdisplayDetailedInfo(SBselectedDate);
    }
    SBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            SBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        SBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                SBhandleBarClick(event, array);
            }
        };
    }
}

function SBfindMaxResult() {
    var SBmaxResult = 0;

    fetchedDataArray.forEach(SBresultData => {
        var SBtimeString = SBresultData.sbTotalTime;

        // Check if the timeString is not empty before parsing
        if (SBtimeString !== undefined && SBtimeString !== '' && SBtimeString !== null) {
            var seconds = parseTimeToSeconds2(SBtimeString);
            SBmaxResult = Math.max(SBmaxResult, secondsToMinutes(seconds));
        }
    });
    return SBmaxResult;
}
function SBfindMaxResult2() {
    var SBmaxResult = 0;

    fetchedDataArray.forEach(SBresultData => {
        var SBtimeString = SBresultData.sbTotalTime;

        // Check if the timeString is not empty before parsing
        if (SBtimeString !== undefined && SBtimeString !== '' && SBtimeString !== null) {
            var seconds = parseTimeToSeconds2(SBtimeString);
            SBmaxResult = Math.max(SBmaxResult, seconds);
        }
    });
    return SBmaxResult;
}
function SBupdateChartData(SBstartDate, SBendDate) {
    var SBdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var SBcurrentDate = new Date(SBstartDate);
    while (SBcurrentDate <= SBendDate) {
        SBdateRange.push(new Date(SBcurrentDate));
        SBcurrentDate.setDate(SBcurrentDate.getDate() + 1); // Move to the next day
    }

    var SBaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(SBresultData => {
        var SBresultDate = new Date(SBresultData.sbResultDate);
        var SBseconds;
        var SBminutes;
        var SBtimeString = SBresultData.sbTotalTime;
        if (SBtimeString !== undefined && SBtimeString !== '' && SBtimeString !== null) {
            SBseconds = parseTimeToSeconds2(SBtimeString);
            SBminutes = secondsToMinutes(SBseconds);
        } else {
            SBminutes = 0;
        }
        if (!isNaN(SBresultDate.getTime())) {
            var SBformattedDate = formatDateAsDMY(SBresultDate);

            if (!SBaggregatedData[SBformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                SBaggregatedData[SBformattedDate] = { SBtotalValue: parseFloat(SBminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                SBaggregatedData[SBformattedDate].SBtotalValue += parseFloat(SBminutes);
                SBaggregatedData[SBformattedDate].count++;
            }
        }
    });

    var SBmaxResult = SBfindMaxResult();
    var SBchartData = SBdateRange.map(SBresultDate => {
        var SBformattedDate = formatDateAsDMY(SBresultDate);
        var SBaggregatedDatum = SBaggregatedData[SBformattedDate];
        return SBaggregatedDatum ? SBaggregatedDatum.SBtotalValue / SBaggregatedDatum.count : 0;
    });

    return {
        SBchartData: SBchartData,
        SBmaxYValue: Math.floor(SBmaxResult + 2),
        SBselectedDataDatesYear: SBdateRange.map(formatDateAsDMY)
    };
}
function SBupdateChart(SBstartDate, SBendDate) {
    var { SBchartData, SBmaxYValue, SBselectedDataDatesYear } = SBupdateChartData(SBstartDate, SBendDate);

    // Update x-axis labels and chart data
    var SBselectedDataDatesMonthDay = SBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    SBchart.data.labels = SBselectedDataDatesMonthDay;
    SBchart.data.datasets[0].data = SBchartData;
    SBchart.options.scales.yAxes[0].ticks.max = SBmaxYValue;
    function SBhandleBarClick(event, array) {
        var SBindex = array[0]._index; // Get the clicked bar index
        var SBselectedDate = SBselectedDataDatesYear[SBindex];
        SBdisplayDetailedInfo(SBselectedDate);
    }
    SBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            SBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        SBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                SBhandleBarClick(event, array);
            }
        };
    }
    SBchart.update();
}
var SBnumberOfTests;
function SBupdateOverview() {
    SBnumberOfTests = 0;
    var SBmax = SBfindMaxResult();
    var SBmax2 = SBfindMaxResult2();
    var SBinfoOverviewElements = document.getElementsByClassName('SBinfoOverview');
    fetchedDataArray.forEach(SBresultData => {
        var SBtimeString = SBresultData.sbTotalTime;
        var SBdateString = SBresultData.sbResultDate;
        var SBrounds = SBresultData.sbIntervals;
        // Check if the timeString is not empty before parsing
        if (SBtimeString !== undefined && SBtimeString !== '' && SBtimeString !== null) {
            var SBseconds = parseTimeToSeconds2(SBtimeString);
            // Store the value of dateOfLongestResult when SBmax is updated
            if (SBseconds === SBmax2) {
                SBdateOfLongestResult = SBdateString;
                SBintervals = SBrounds;
            }
            SBlatestResult = parseTimeToSeconds2(SBtimeString);
            SBlastDate = SBdateString;
            SBlastIntervals = SBrounds;
            SBnumberOfTests++;
        }
    });
    if (SBnumberOfTests !== 0) {
        SBinfoOverview.innerHTML = '';
        for (var i = 0; i < SBinfoOverviewElements.length; i++) {
            SBinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('SBContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('SBnumberOfSessions').value = SBnumberOfTests + ' Sess\u00F5es';
        } else {
            document.getElementById('SBnumberOfSessions').value = SBnumberOfTests + ' Sessions';
        }
        document.getElementById('SBlongestRound').value = convertMinToMinSec(SBmax) + ' ' + SBintervals + ' rounds ' + formatDateAsDMY(SBdateOfLongestResult);
        document.getElementById('SBlatestRound').value = convertMinToMinSec(secondsToMinutes(SBlatestResult)) + ' ' + SBlastIntervals + ' rounds ' + formatDateAsDMY(SBlastDate);
        document.getElementById('SBaccordion').style.display = 'block';
    } else {
        document.getElementById('SBaccordion').style.display = 'none';
        if (isPortuguese) {
            SBinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            SBinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < SBinfoOverviewElements.length; i++) {
            SBinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('SBContainer').style.display = 'none';
    }
}
var SBresultPage = document.getElementById('SBresultPage'),
    SBresultDateHeader = document.getElementById('SBresultDateHeader'),
    SBresultSessions = document.getElementById('SBresultSessions');

function SBdisplayDetailedInfo(SBselectedDate) {
    function SBdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.SBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.SBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            SBupdateChart(SBstartDate, SBendDate);
                            SBupdateOverview();
                            openPage(SBresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backSBresults.style.display = "none";
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
    var SBnumberOfResults = 1;
    SBresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(SBresultData => {
        var SBtimeString = SBresultData.sbTotalTime;
        var SBdateString = SBresultData.sbResultDate;
        var SBresultId = SBresultData.resultId;
        SBintervals = SBresultData.sbIntervals;
        // Check if the timeString is not empty before parsing
        if (SBtimeString !== undefined && SBtimeString !== '' && SBtimeString !== null) {
            var SBseconds = parseTimeToSeconds2(SBtimeString);
            // Store the value of dateOfLongestResult when SBmax is updated
            if (SBselectedDate === formatDateAsDMY(SBdateString)) {
                if (isPortuguese) {
                    SBresultDateHeader.innerHTML = 'Resultados do dia ' + SBselectedDate;
                    SBresultSessions.innerHTML += '<form method="post" class="SBdelete-form">' +
                        '<div>Sess\u00E3o ' + SBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(SBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + SBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + SBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger SBdelete-button" />' +
                        '</form>';
                } else {
                    SBresultDateHeader.innerHTML = 'Results on ' + SBselectedDate;
                    SBresultSessions.innerHTML += '<form method="post" class="SBdelete-form">' +
                        '<div>Session ' + SBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(SBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + SBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + SBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger SBdelete-button" />' +
                        '</form>';
                }
                SBnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var SBdeleteButtons = document.querySelectorAll('.SBdelete-button');
    SBdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var SBform = this.closest('.SBdelete-form');
            var SBresultId = SBform.querySelector('[name="resultId"]').value;
            SBdeleteResult(SBresultId);
        });
    });

    openPage(resultsPage, SBresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backSBresults.style.display = "block";
    closeModalResults();
}
// END SB
// CB
// Initialize startDate and endDate
var CBtoday = new Date();
var CBlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var CBresultDate = new Date(CBtoday);
    CBresultDate.setDate(CBtoday.getDate() - i);
    CBlast7Dates.push(CBresultDate); // Push the Date object directly
}

var CBendDate = CBlast7Dates[CBlast7Dates.length - 1]; // Initialize with the latest date
var CBstartDate = CBlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var CBtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var CBContainer = document.getElementById('CBContainer');
CBContainer.addEventListener('touchstart', function (event) {
    CBtouchStartX = event.touches[0].clientX;
});

var CBscrollThreshold = 10; // Adjust this value to control the scroll threshold

var CBlastScrollX = null;
var { CBchartData, CBmaxYValue, CBselectedDataDatesYear } = CBupdateChartData(CBstartDate, CBendDate, fetchedDataArray);
var CBinfoOverview = document.getElementById('CBinfoOverview');
var CBdateOfLongestResult;
var CBlastIntervals;
var CBintervals;
var CBlastDate;
var CBlatestResult;
var CBchart;
function CBinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var CBdateA = new Date(a.CBresultDate);
        var CBdateB = new Date(b.CBresultDate);
        return CBdateA - CBdateB;
    });
    var CBselectedDataDatesMonthDay = CBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        CBchart = new Chart("CBchart", {
            type: "bar",
            data: {
                labels: CBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: CBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados da Respira\u00E7\u00E3o Coerente " + "(" + getYear(CBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'M\u00E9dia do dia';
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
                            max: CBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        CBchart = new Chart("CBchart", {
            type: "bar",
            data: {
                labels: CBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: CBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your Coherent Breathing results " + "(" + getYear(CBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
                            max: CBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    CBContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (CBtouchStartX !== null) {
            var CBtouchMoveX = event.touches[0].clientX;

            if (CBlastScrollX !== null) {
                var CBdelta = CBtouchMoveX - CBlastScrollX;

                if (Math.abs(CBdelta) >= CBscrollThreshold) {
                    CBlastScrollX = CBtouchMoveX;

                    if (CBdelta > 0) {
                        // Scroll right, decrease the date range
                        CBendDate.setDate(CBendDate.getDate() - 1);
                        CBstartDate.setDate(CBstartDate.getDate() - 1);
                        if (isPortuguese) {
                            CBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Coerente " + "(" + getYear(CBendDate) + ")";
                        } else {
                            CBchart.options.title.text = "Your Coherent Breathing results " + "(" + getYear(CBendDate) + ")";
                        }
                    } else if (CBdelta < 0) {
                        if (formatDateAsDMY(CBendDate) == formatDateAsDMY(CBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            CBendDate.setDate(CBendDate.getDate() + 1);
                            CBstartDate.setDate(CBstartDate.getDate() + 1);
                            if (isPortuguese) {
                                CBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Coerente " + "(" + getYear(CBendDate) + ")";
                            } else {
                                CBchart.options.title.text = "Your Coherent Breathing results " + "(" + getYear(CBendDate) + ")";
                            }
                        }
                    }
                    CBupdateChart(CBstartDate, CBendDate);
                }
            } else {
                CBlastScrollX = CBtouchMoveX;
            }
        }
    });

    CBContainer.addEventListener('touchend', function () {
        CBlastScrollX = null;
    });
    CBContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var CBdelta = event.deltaX * 0.1;

        if (CBdelta < 0) {
            // Scroll left, decrease the date range
            CBendDate.setDate(CBendDate.getDate() - 1);
            CBstartDate.setDate(CBstartDate.getDate() - 1);
            if (isPortuguese) {
                CBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Coerente " + "(" + getYear(CBendDate) + ")";
            } else {
                CBchart.options.title.text = "Your Coherent Breathing results " + "(" + getYear(CBendDate) + ")";
            }
        } else if (CBdelta > 0) {
            if (formatDateAsDMY(CBendDate) == formatDateAsDMY(CBtoday)) { }
            else {
                // Scroll right, increase the date range
                CBendDate.setDate(CBendDate.getDate() + 1);
                CBstartDate.setDate(CBstartDate.getDate() + 1);
                if (isPortuguese) {
                    CBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o Coerente " + "(" + getYear(CBendDate) + ")";
                } else {
                    CBchart.options.title.text = "Your Coherent Breathing results " + "(" + getYear(CBendDate) + ")";
                }
            }
        }
        CBupdateChart(CBstartDate, CBendDate);
    });
    CBupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function CBhandleBarClick(event, array) {
        var CBindex = array[0]._index; // Get the clicked bar index
        var CBselectedDate = CBselectedDataDatesYear[CBindex];
        CBdisplayDetailedInfo(CBselectedDate);
    }
    CBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            CBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        CBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                CBhandleBarClick(event, array);
            }
        };
    }
}

function CBfindMaxResult() {
    var CBmaxResult = 0;

    fetchedDataArray.forEach(CBresultData => {
        var CBtimeString = CBresultData.cbTotalTime;

        // Check if the timeString is not empty before parsing
        if (CBtimeString !== undefined && CBtimeString !== '' && CBtimeString !== null) {
            var seconds = parseTimeToSeconds2(CBtimeString);
            CBmaxResult = Math.max(CBmaxResult, secondsToMinutes(seconds));
        }
    });
    return CBmaxResult;
}
function CBfindMaxResult2() {
    var CBmaxResult = 0;

    fetchedDataArray.forEach(CBresultData => {
        var CBtimeString = CBresultData.cbTotalTime;

        // Check if the timeString is not empty before parsing
        if (CBtimeString !== undefined && CBtimeString !== '' && CBtimeString !== null) {
            var seconds = parseTimeToSeconds2(CBtimeString);
            CBmaxResult = Math.max(CBmaxResult, seconds);
        }
    });
    return CBmaxResult;
}
function CBupdateChartData(CBstartDate, CBendDate) {
    var CBdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var CBcurrentDate = new Date(CBstartDate);
    while (CBcurrentDate <= CBendDate) {
        CBdateRange.push(new Date(CBcurrentDate));
        CBcurrentDate.setDate(CBcurrentDate.getDate() + 1); // Move to the next day
    }

    var CBaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(CBresultData => {
        var CBresultDate = new Date(CBresultData.cbResultDate);
        var CBseconds;
        var CBminutes;
        var CBtimeString = CBresultData.cbTotalTime;
        if (CBtimeString !== undefined && CBtimeString !== '' && CBtimeString !== null) {
            CBseconds = parseTimeToSeconds2(CBtimeString);
            CBminutes = secondsToMinutes(CBseconds);
        } else {
            CBminutes = 0;
        }
        if (!isNaN(CBresultDate.getTime())) {
            var CBformattedDate = formatDateAsDMY(CBresultDate);

            if (!CBaggregatedData[CBformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                CBaggregatedData[CBformattedDate] = { CBtotalValue: parseFloat(CBminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                CBaggregatedData[CBformattedDate].CBtotalValue += parseFloat(CBminutes);
                CBaggregatedData[CBformattedDate].count++;
            }
        }
    });

    var CBmaxResult = CBfindMaxResult();
    var CBchartData = CBdateRange.map(CBresultDate => {
        var CBformattedDate = formatDateAsDMY(CBresultDate);
        var CBaggregatedDatum = CBaggregatedData[CBformattedDate];
        return CBaggregatedDatum ? CBaggregatedDatum.CBtotalValue / CBaggregatedDatum.count : 0;
    });

    return {
        CBchartData: CBchartData,
        CBmaxYValue: Math.floor(CBmaxResult + 2),
        CBselectedDataDatesYear: CBdateRange.map(formatDateAsDMY)
    };
}
function CBupdateChart(CBstartDate, CBendDate) {
    var { CBchartData, CBmaxYValue, CBselectedDataDatesYear } = CBupdateChartData(CBstartDate, CBendDate);

    // Update x-axis labels and chart data
    var CBselectedDataDatesMonthDay = CBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    CBchart.data.labels = CBselectedDataDatesMonthDay;
    CBchart.data.datasets[0].data = CBchartData;
    CBchart.options.scales.yAxes[0].ticks.max = CBmaxYValue;
    function CBhandleBarClick(event, array) {
        var CBindex = array[0]._index; // Get the clicked bar index
        var CBselectedDate = CBselectedDataDatesYear[CBindex];
        CBdisplayDetailedInfo(CBselectedDate);
    }
    CBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            CBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        CBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                CBhandleBarClick(event, array);
            }
        };
    }
    CBchart.update();
}
var CBnumberOfTests;
function CBupdateOverview() {
    CBnumberOfTests = 0;
    var CBmax = CBfindMaxResult();
    var CBmax2 = CBfindMaxResult2();
    var CBinfoOverviewElements = document.getElementsByClassName('CBinfoOverview');
    fetchedDataArray.forEach(CBresultData => {
        var CBtimeString = CBresultData.cbTotalTime;
        var CBdateString = CBresultData.cbResultDate;
        var CBrounds = CBresultData.cbIntervals;
        // Check if the timeString is not empty before parsing
        if (CBtimeString !== undefined && CBtimeString !== '' && CBtimeString !== null) {
            var CBseconds = parseTimeToSeconds2(CBtimeString);
            // Store the value of dateOfLongestResult when CBmax is updated
            if (CBseconds === CBmax2) {
                CBdateOfLongestResult = CBdateString;
                CBintervals = CBrounds;
            }
            CBlatestResult = parseTimeToSeconds2(CBtimeString);
            CBlastDate = CBdateString;
            CBlastIntervals = CBrounds;
            CBnumberOfTests++;
        }
    });
    if (CBnumberOfTests !== 0) {
        CBinfoOverview.innerHTML = '';
        for (var i = 0; i < CBinfoOverviewElements.length; i++) {
            CBinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('CBContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('CBnumberOfSessions').value = CBnumberOfTests + ' Sess\u00F5es';
        } else {
            document.getElementById('CBnumberOfSessions').value = CBnumberOfTests + ' Sessions';
        }
        document.getElementById('CBlongestRound').value = convertMinToMinSec(CBmax) + ' ' + CBintervals + ' rounds ' + formatDateAsDMY(CBdateOfLongestResult);
        document.getElementById('CBlatestRound').value = convertMinToMinSec(secondsToMinutes(CBlatestResult)) + ' ' + CBlastIntervals + ' rounds ' + formatDateAsDMY(CBlastDate);
        document.getElementById('CBaccordion').style.display = 'block';
    } else {
        document.getElementById('CBaccordion').style.display = 'none';
        if (isPortuguese) {
            CBinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            CBinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < CBinfoOverviewElements.length; i++) {
            CBinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('CBContainer').style.display = 'none';
    }
}
var CBresultPage = document.getElementById('CBresultPage'),
    CBresultDateHeader = document.getElementById('CBresultDateHeader'),
    CBresultSessions = document.getElementById('CBresultSessions');

function CBdisplayDetailedInfo(CBselectedDate) {
    function CBdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.CBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.CBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            CBupdateChart(CBstartDate, CBendDate);
                            CBupdateOverview();
                            openPage(CBresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backCBresults.style.display = "none";
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
    var CBnumberOfResults = 1;
    CBresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(CBresultData => {
        var CBtimeString = CBresultData.cbTotalTime;
        var CBdateString = CBresultData.cbResultDate;
        var CBresultId = CBresultData.resultId;
        CBintervals = CBresultData.cbIntervals;
        // Check if the timeString is not empty before parsing
        if (CBtimeString !== undefined && CBtimeString !== '' && CBtimeString !== null) {
            var CBseconds = parseTimeToSeconds2(CBtimeString);
            // Store the value of dateOfLongestResult when CBmax is updated
            if (CBselectedDate === formatDateAsDMY(CBdateString)) {
                if (isPortuguese) {
                    CBresultDateHeader.innerHTML = 'Resultados do dia ' + CBselectedDate;
                    CBresultSessions.innerHTML += '<form method="post" class="CBdelete-form">' +
                        '<div>Sess\u00E3o ' + CBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(CBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + CBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + CBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger CBdelete-button" />' +
                        '</form>';
                } else {
                    CBresultDateHeader.innerHTML = 'Results on ' + CBselectedDate;
                    CBresultSessions.innerHTML += '<form method="post" class="CBdelete-form">' +
                        '<div>Session ' + CBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(CBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + CBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + CBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger CBdelete-button" />' +
                        '</form>';
                }
                CBnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var CBdeleteButtons = document.querySelectorAll('.CBdelete-button');
    CBdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var CBform = this.closest('.CBdelete-form');
            var CBresultId = CBform.querySelector('[name="resultId"]').value;
            CBdeleteResult(CBresultId);
        });
    });

    openPage(resultsPage, CBresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backCBresults.style.display = "block";
    closeModalResults();
}
// END CB
// RB
// Initialize startDate and endDate
var RBtoday = new Date();
var RBlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var RBresultDate = new Date(RBtoday);
    RBresultDate.setDate(RBtoday.getDate() - i);
    RBlast7Dates.push(RBresultDate); // Push the Date object directly
}

var RBendDate = RBlast7Dates[RBlast7Dates.length - 1]; // Initialize with the latest date
var RBstartDate = RBlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var RBtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var RBContainer = document.getElementById('RBContainer');
RBContainer.addEventListener('touchstart', function (event) {
    RBtouchStartX = event.touches[0].clientX;
});

var RBscrollThreshold = 10; // Adjust this value to control the scroll threshold

var RBlastScrollX = null;
var { RBchartData, RBmaxYValue, RBselectedDataDatesYear } = RBupdateChartData(RBstartDate, RBendDate, fetchedDataArray);
var RBinfoOverview = document.getElementById('RBinfoOverview');
var RBdateOfLongestResult;
var RBlastIntervals;
var RBintervals;
var RBlastDate;
var RBlatestResult;
var RBchart;
function RBinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var RBdateA = new Date(a.RBresultDate);
        var RBdateB = new Date(b.RBresultDate);
        return RBdateA - RBdateB;
    });
    var RBselectedDataDatesMonthDay = RBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        RBchart = new Chart("RBchart", {
            type: "bar",
            data: {
                labels: RBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: RBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados da Respira\u00E7\u00E3o 478 " + "(" + getYear(RBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'M\u00E9dia do dia';
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
                            max: RBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        RBchart = new Chart("RBchart", {
            type: "bar",
            data: {
                labels: RBselectedDataDatesMonthDay,
                datasets: [{
                    backgroundColor: '#49B79D',
                    data: RBchartData,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your 478 Breathing results " + "(" + getYear(RBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return 'Average Results on';
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
                            max: RBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    RBContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (RBtouchStartX !== null) {
            var RBtouchMoveX = event.touches[0].clientX;

            if (RBlastScrollX !== null) {
                var RBdelta = RBtouchMoveX - RBlastScrollX;

                if (Math.abs(RBdelta) >= RBscrollThreshold) {
                    RBlastScrollX = RBtouchMoveX;

                    if (RBdelta > 0) {
                        // Scroll right, decrease the date range
                        RBendDate.setDate(RBendDate.getDate() - 1);
                        RBstartDate.setDate(RBstartDate.getDate() - 1);
                        if (isPortuguese) {
                            RBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o 478 " + "(" + getYear(RBendDate) + ")";
                        } else {
                            RBchart.options.title.text = "Your 478 Breathing results " + "(" + getYear(RBendDate) + ")";
                        }
                    } else if (RBdelta < 0) {
                        if (formatDateAsDMY(RBendDate) == formatDateAsDMY(RBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            RBendDate.setDate(RBendDate.getDate() + 1);
                            RBstartDate.setDate(RBstartDate.getDate() + 1);
                            if (isPortuguese) {
                                RBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o 478 " + "(" + getYear(RBendDate) + ")";
                            } else {
                                RBchart.options.title.text = "Your 478 Breathing results " + "(" + getYear(RBendDate) + ")";
                            }
                        }
                    }
                    RBupdateChart(RBstartDate, RBendDate);
                }
            } else {
                RBlastScrollX = RBtouchMoveX;
            }
        }
    });

    RBContainer.addEventListener('touchend', function () {
        RBlastScrollX = null;
    });
    RBContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var RBdelta = event.deltaX * 0.1;

        if (RBdelta < 0) {
            // Scroll left, decrease the date range
            RBendDate.setDate(RBendDate.getDate() - 1);
            RBstartDate.setDate(RBstartDate.getDate() - 1);
            if (isPortuguese) {
                RBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o 478 " + "(" + getYear(RBendDate) + ")";
            } else {
                RBchart.options.title.text = "Your 478 Breathing results " + "(" + getYear(RBendDate) + ")";
            }
        } else if (RBdelta > 0) {
            if (formatDateAsDMY(RBendDate) == formatDateAsDMY(RBtoday)) { }
            else {
                // Scroll right, increase the date range
                RBendDate.setDate(RBendDate.getDate() + 1);
                RBstartDate.setDate(RBstartDate.getDate() + 1);
                if (isPortuguese) {
                    RBchart.options.title.text = "Seus resultados da Respira\u00E7\u00E3o 478 " + "(" + getYear(RBendDate) + ")";
                } else {
                    RBchart.options.title.text = "Your 478 Breathing results " + "(" + getYear(RBendDate) + ")";
                }
            }
        }
        RBupdateChart(RBstartDate, RBendDate);
    });
    RBupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function RBhandleBarClick(event, array) {
        var RBindex = array[0]._index; // Get the clicked bar index
        var RBselectedDate = RBselectedDataDatesYear[RBindex];
        RBdisplayDetailedInfo(RBselectedDate);
    }
    RBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            RBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        RBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                RBhandleBarClick(event, array);
            }
        };
    }
}

function RBfindMaxResult() {
    var RBmaxResult = 0;

    fetchedDataArray.forEach(RBresultData => {
        var RBtimeString = RBresultData.rbTotalTime;

        // Check if the timeString is not empty before parsing
        if (RBtimeString !== undefined && RBtimeString !== '' && RBtimeString !== null) {
            var seconds = parseTimeToSeconds2(RBtimeString);
            RBmaxResult = Math.max(RBmaxResult, secondsToMinutes(seconds));
        }
    });
    return RBmaxResult;
}
function RBfindMaxResult2() {
    var RBmaxResult = 0;

    fetchedDataArray.forEach(RBresultData => {
        var RBtimeString = RBresultData.rbTotalTime;

        // Check if the timeString is not empty before parsing
        if (RBtimeString !== undefined && RBtimeString !== '' && RBtimeString !== null) {
            var seconds = parseTimeToSeconds2(RBtimeString);
            RBmaxResult = Math.max(RBmaxResult, seconds);
        }
    });
    return RBmaxResult;
}
function RBupdateChartData(RBstartDate, RBendDate) {
    var RBdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var RBcurrentDate = new Date(RBstartDate);
    while (RBcurrentDate <= RBendDate) {
        RBdateRange.push(new Date(RBcurrentDate));
        RBcurrentDate.setDate(RBcurrentDate.getDate() + 1); // Move to the next day
    }

    var RBaggregatedData = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(RBresultData => {
        var RBresultDate = new Date(RBresultData.rbResultDate);
        var RBseconds;
        var RBminutes;
        var RBtimeString = RBresultData.rbTotalTime;
        if (RBtimeString !== undefined && RBtimeString !== '' && RBtimeString !== null) {
            RBseconds = parseTimeToSeconds2(RBtimeString);
            RBminutes = secondsToMinutes(RBseconds);
        } else {
            RBminutes = 0;
        }
        if (!isNaN(RBresultDate.getTime())) {
            var RBformattedDate = formatDateAsDMY(RBresultDate);

            if (!RBaggregatedData[RBformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                RBaggregatedData[RBformattedDate] = { RBtotalValue: parseFloat(RBminutes), count: 1 };
            } else {
                // If the date already exists, update the existing entry
                RBaggregatedData[RBformattedDate].RBtotalValue += parseFloat(RBminutes);
                RBaggregatedData[RBformattedDate].count++;
            }
        }
    });

    var RBmaxResult = RBfindMaxResult();
    var RBchartData = RBdateRange.map(RBresultDate => {
        var RBformattedDate = formatDateAsDMY(RBresultDate);
        var RBaggregatedDatum = RBaggregatedData[RBformattedDate];
        return RBaggregatedDatum ? RBaggregatedDatum.RBtotalValue / RBaggregatedDatum.count : 0;
    });

    return {
        RBchartData: RBchartData,
        RBmaxYValue: Math.floor(RBmaxResult + 2),
        RBselectedDataDatesYear: RBdateRange.map(formatDateAsDMY)
    };
}
function RBupdateChart(RBstartDate, RBendDate) {
    var { RBchartData, RBmaxYValue, RBselectedDataDatesYear } = RBupdateChartData(RBstartDate, RBendDate);

    // Update x-axis labels and chart data
    var RBselectedDataDatesMonthDay = RBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    RBchart.data.labels = RBselectedDataDatesMonthDay;
    RBchart.data.datasets[0].data = RBchartData;
    RBchart.options.scales.yAxes[0].ticks.max = RBmaxYValue;
    function RBhandleBarClick(event, array) {
        var RBindex = array[0]._index; // Get the clicked bar index
        var RBselectedDate = RBselectedDataDatesYear[RBindex];
        RBdisplayDetailedInfo(RBselectedDate);
    }
    RBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            RBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        RBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                RBhandleBarClick(event, array);
            }
        };
    }
    RBchart.update();
}
var RBnumberOfTests;
function RBupdateOverview() {
    RBnumberOfTests = 0;
    var RBmax = RBfindMaxResult();
    var RBmax2 = RBfindMaxResult2();
    var RBinfoOverviewElements = document.getElementsByClassName('RBinfoOverview');
    fetchedDataArray.forEach(RBresultData => {
        var RBtimeString = RBresultData.rbTotalTime;
        var RBdateString = RBresultData.rbResultDate;
        var RBrounds = RBresultData.rbIntervals;
        // Check if the timeString is not empty before parsing
        if (RBtimeString !== undefined && RBtimeString !== '' && RBtimeString !== null) {
            var RBseconds = parseTimeToSeconds2(RBtimeString);
            // Store the value of dateOfLongestResult when RBmax is updated
            if (RBseconds === RBmax2) {
                RBdateOfLongestResult = RBdateString;
                RBintervals = RBrounds;
            }
            RBlatestResult = parseTimeToSeconds2(RBtimeString);
            RBlastDate = RBdateString;
            RBlastIntervals = RBrounds;
            RBnumberOfTests++;
        }
    });
    if (RBnumberOfTests !== 0) {
        RBinfoOverview.innerHTML = '';
        for (var i = 0; i < RBinfoOverviewElements.length; i++) {
            RBinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('RBContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('RBnumberOfSessions').value = RBnumberOfTests + ' Sess\u00F5es';
        } else {
            document.getElementById('RBnumberOfSessions').value = RBnumberOfTests + ' Sessions';
        }
        document.getElementById('RBlongestRound').value = convertMinToMinSec(RBmax) + ' ' + RBintervals + ' rounds ' + formatDateAsDMY(RBdateOfLongestResult);
        document.getElementById('RBlatestRound').value = convertMinToMinSec(secondsToMinutes(RBlatestResult)) + ' ' + RBlastIntervals + ' rounds ' + formatDateAsDMY(RBlastDate);
        document.getElementById('RBaccordion').style.display = 'block';
    } else {
        document.getElementById('RBaccordion').style.display = 'none';
        if (isPortuguese) {
            RBinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            RBinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < RBinfoOverviewElements.length; i++) {
            RBinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('RBContainer').style.display = 'none';
    }
}
var RBresultPage = document.getElementById('RBresultPage'),
    RBresultDateHeader = document.getElementById('RBresultDateHeader'),
    RBresultSessions = document.getElementById('RBresultSessions');

function RBdisplayDetailedInfo(RBselectedDate) {
    function RBdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.RBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.RBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            RBupdateChart(RBstartDate, RBendDate);
                            RBupdateOverview();
                            openPage(RBresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backRBresults.style.display = "none";
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
    var RBnumberOfResults = 1;
    RBresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(RBresultData => {
        var RBtimeString = RBresultData.rbTotalTime;
        var RBdateString = RBresultData.rbResultDate;
        var RBresultId = RBresultData.resultId;
        RBintervals = RBresultData.rbIntervals;
        // Check if the timeString is not empty before parsing
        if (RBtimeString !== undefined && RBtimeString !== '' && RBtimeString !== null) {
            var RBseconds = parseTimeToSeconds2(RBtimeString);
            // Store the value of dateOfLongestResult when RBmax is updated
            if (RBselectedDate === formatDateAsDMY(RBdateString)) {
                if (isPortuguese) {
                    RBresultDateHeader.innerHTML = 'Resultados do dia ' + RBselectedDate;
                    RBresultSessions.innerHTML += '<form method="post" class="RBdelete-form">' +
                        '<div>Sess\u00E3o ' + RBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(RBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + RBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + RBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger RBdelete-button" />' +
                        '</form>';
                } else {
                    RBresultDateHeader.innerHTML = 'Results on ' + RBselectedDate;
                    RBresultSessions.innerHTML += '<form method="post" class="RBdelete-form">' +
                        '<div>Session ' + RBnumberOfResults + ' __________</div>' +
                        '<input value="' + convertMinToMinSec(secondsToMinutes(RBseconds)) + ' " readonly class="resultInput"/>' +
                        '<input value="' + RBintervals + ' rounds" readonly class="resultInput"/>' +
                        '<input name="resultId" value="' + RBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger RBdelete-button" />' +
                        '</form>';
                }
                RBnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var RBdeleteButtons = document.querySelectorAll('.RBdelete-button');
    RBdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var RBform = this.closest('.RBdelete-form');
            var RBresultId = RBform.querySelector('[name="resultId"]').value;
            RBdeleteResult(RBresultId);
        });
    });

    openPage(resultsPage, RBresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backRBresults.style.display = "block";
    closeModalResults();
}
// END RB
// WH
function WHgetHeightestNumber(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Convert the array of time strings to an array of total seconds
    const timesInSeconds = timeStrings.map(timeString => {
        const [minutes, seconds] = timeString.split(":").map(Number);
        return minutes * 60 + seconds;
    });

    // Step 3: Find the highest time value in seconds
    const highestTimeInSeconds = Math.max(...timesInSeconds);

    // Step 4: Convert the highest time value back to the "minutes:seconds" format
    const highestMinutes = Math.floor(highestTimeInSeconds / 60);
    const highestSeconds = highestTimeInSeconds % 60;
    const highestTimeString = `${String(highestMinutes).padStart(2, '0')}:${String(highestSeconds).padStart(2, '0')}`;

    return highestTimeString;
}
function WHgetAverage(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Convert the array of time strings to an array of total seconds
    const timesInSeconds = timeStrings.map(timeString => {
        const [minutes, seconds] = timeString.split(":").map(Number);
        return minutes * 60 + seconds;
    });

    // Step 3: Calculate the average time value in seconds
    const totalSeconds = timesInSeconds.reduce((acc, time) => acc + time, 0);
    const averageTimeInSeconds = totalSeconds / timesInSeconds.length;

    // Step 4: Convert the average time value back to the "minutes:seconds" format
    const averageMinutes = Math.floor(averageTimeInSeconds / 60);
    const averageSeconds = Math.round(averageTimeInSeconds % 60); // Rounded to the nearest second
    const averageTimeString = `${String(averageMinutes).padStart(2, '0')}:${String(averageSeconds).padStart(2, '0')}`;


    return averageTimeString;
}
// Initialize startDate and endDate
var WHtoday = new Date();
var WHlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var WHresultDate = new Date(WHtoday);
    WHresultDate.setDate(WHtoday.getDate() - i);
    WHlast7Dates.push(WHresultDate); // Push the Date object directly
}

var WHendDate = WHlast7Dates[WHlast7Dates.length - 1]; // Initialize with the latest date
var WHstartDate = WHlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var WHtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var WHContainer = document.getElementById('WHContainer');
WHContainer.addEventListener('touchstart', function (event) {
    WHtouchStartX = event.touches[0].clientX;
});

var WHscrollThreshold = 10; // Adjust this value to control the scroll threshold

var WHlastScrollX = null;
var { WHchartData, WHmaxYValue, WHselectedDataDatesYear, longestRoundData } = WHupdateChartData(WHstartDate, WHendDate, fetchedDataArray);
var WHinfoOverview = document.getElementById('WHinfoOverview');
var WHdateOfLongestResult;
var WHLongestAverageIntervals;
var WHlongestAverageDate;
var WHchart;
function WHinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var WHdateA = new Date(a.WHresultDate);
        var WHdateB = new Date(b.WHresultDate);
        return WHdateA - WHdateB;
    });
    var WHselectedDataDatesMonthDay = WHselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        WHchart = new Chart("WHchart", {
            type: "bar",
            data: {
                labels: WHselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: WHchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados de Hiperventila\u00E7\u00E3o Controlada " + "(" + getYear(WHendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'M\u00E9dia: ' + convertMinToMinSec(Math.round(value * 100) / 100);
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Round mais longo: ' + convertMinToMinSec(Math.round(value * 100) / 100);
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: WHmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        WHchart = new Chart("WHchart", {
            type: "bar",
            data: {
                labels: WHselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: WHchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your Controlled Hyperventilation results " + "(" + getYear(WHendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'Average: ' + convertMinToMinSec(Math.round(value * 100) / 100);
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Longest Round: ' + convertMinToMinSec(Math.round(value * 100) / 100);
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: WHmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    WHContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (WHtouchStartX !== null) {
            var WHtouchMoveX = event.touches[0].clientX;

            if (WHlastScrollX !== null) {
                var WHdelta = WHtouchMoveX - WHlastScrollX;

                if (Math.abs(WHdelta) >= WHscrollThreshold) {
                    WHlastScrollX = WHtouchMoveX;

                    if (WHdelta > 0) {
                        // Scroll right, decrease the date range
                        WHendDate.setDate(WHendDate.getDate() - 1);
                        WHstartDate.setDate(WHstartDate.getDate() - 1);
                        if (isPortuguese) {
                            WHchart.options.title.text = "Seus resultados de Hiperventila\u00E7\u00E3o Controlada " + "(" + getYear(WHendDate) + ")";
                        } else {
                            WHchart.options.title.text = "Your Controlled Hyperventilation results " + "(" + getYear(WHendDate) + ")";
                        }
                    } else if (WHdelta < 0) {
                        if (formatDateAsDMY(WHendDate) == formatDateAsDMY(WHtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            WHendDate.setDate(WHendDate.getDate() + 1);
                            WHstartDate.setDate(WHstartDate.getDate() + 1);
                            if (isPortuguese) {
                                WHchart.options.title.text = "Seus resultados de Hiperventila\u00E7\u00E3o Controlada " + "(" + getYear(WHendDate) + ")";
                            } else {
                                WHchart.options.title.text = "Your Controlled Hyperventilation results " + "(" + getYear(WHendDate) + ")";
                            }
                        }
                    }
                    WHupdateChart(WHstartDate, WHendDate);
                }
            } else {
                WHlastScrollX = WHtouchMoveX;
            }
        }
    });

    WHContainer.addEventListener('touchend', function () {
        WHlastScrollX = null;
    });
    WHContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var WHdelta = event.deltaX * 0.1;

        if (WHdelta < 0) {
            // Scroll left, decrease the date range
            WHendDate.setDate(WHendDate.getDate() - 1);
            WHstartDate.setDate(WHstartDate.getDate() - 1);
            if (isPortuguese) {
                WHchart.options.title.text = "Seus resultados de Hiperventila\u00E7\u00E3o Controlada " + "(" + getYear(WHendDate) + ")";
            } else {
                WHchart.options.title.text = "Your Controlled Hyperventilation results " + "(" + getYear(WHendDate) + ")";
            }
        } else if (WHdelta > 0) {
            if (formatDateAsDMY(WHendDate) == formatDateAsDMY(WHtoday)) { }
            else {
                // Scroll right, increase the date range
                WHendDate.setDate(WHendDate.getDate() + 1);
                WHstartDate.setDate(WHstartDate.getDate() + 1);
                if (isPortuguese) {
                    WHchart.options.title.text = "Seus resultados de Hiperventila\u00E7\u00E3o Controlada " + "(" + getYear(WHendDate) + ")";
                } else {
                    WHchart.options.title.text = "Your Controlled Hyperventilation results " + "(" + getYear(WHendDate) + ")";
                }
            }
        }
        WHupdateChart(WHstartDate, WHendDate);
    });
    WHupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    var numberOfClicks = 0;
    function WHhandleBarClick(event, array) {
        numberOfClicks++;
        var WHindex = array[0]._index; // Get the clicked bar index
        var WHselectedDate = WHselectedDataDatesYear[WHindex];
        WHdisplayDetailedInfo(WHselectedDate);
    }
    WHchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            WHhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        WHchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                WHhandleBarClick(event, array);
            }
        };
    }
}

function WHfindMaxResult() {
    var WHmaxResult = 0;

    fetchedDataArray.forEach(WHresultData => {
        var WHtimeString = WHresultData.whTotalTime;

        // Check if the timeString is not empty before parsing
        if (WHtimeString !== undefined && WHtimeString !== '' && WHtimeString !== null) {
            var highestResult = WHgetHeightestNumber(WHtimeString);
            var seconds = parseTimeToSeconds(highestResult);
            WHmaxResult = Math.max(WHmaxResult, secondsToMinutes(seconds));
        }
    });
    return WHmaxResult;
}
function WHfindMaxResult2() {
    var WHmaxResult = 0;

    fetchedDataArray.forEach(WHresultData => {
        var WHtimeString = WHresultData.whTotalTime;

        // Check if the timeString is not empty before parsing
        if (WHtimeString !== undefined && WHtimeString !== '' && WHtimeString !== null) {
            var highestResult = WHgetHeightestNumber(WHtimeString);
            var seconds = parseTimeToSeconds(highestResult);
            WHmaxResult = Math.max(WHmaxResult, seconds);
        }
    });
    return WHmaxResult;
}
function WHfindMaxAverage() {
    var WHmaxResult = 0;

    fetchedDataArray.forEach(WHresultData => {
        var WHtimeString = WHresultData.whTotalTime;
        var WHdateString = WHresultData.whResultDate;
        var WHrounds = WHresultData.whIntervals;
        // Check if the timeString is not empty before parsing
        if (WHtimeString !== undefined && WHtimeString !== '' && WHtimeString !== null) {
            var highestResult = WHgetAverage(WHtimeString);
            var seconds = parseTimeToSeconds(highestResult);
            WHmaxResult = Math.max(WHmaxResult, seconds);
            WHLongestAverageIntervals = WHrounds;
            if (seconds === WHmaxResult) {
                WHlongestAverageDate = WHdateString;
            }
        }
    });
    return WHmaxResult;
}
function WHupdateChartData(WHstartDate, WHendDate) {
    var WHdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var WHcurrentDate = new Date(WHstartDate);
    while (WHcurrentDate <= WHendDate) {
        WHdateRange.push(new Date(WHcurrentDate));
        WHcurrentDate.setDate(WHcurrentDate.getDate() + 1); // Move to the next day
    }

    var WHaggregatedData = {}; // Use an object to aggregate data by date
    var WHaggregatedData2 = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(WHresultData => {
        var WHresultDate = new Date(WHresultData.whResultDate);
        var WHseconds;
        var WHminutes;
        var WHlongest;
        var WHLongestInMinutes;
        var numberOfRows = 0;
        var WHtimeString = WHresultData.whTotalTime;
        if (WHtimeString !== undefined && WHtimeString !== '' && WHtimeString !== null) {
            WHseconds = WHgetAverage(WHtimeString);
            WHminutes = secondsToMinutes(parseTimeToSeconds(WHseconds));
            WHlongest = WHgetHeightestNumber(WHtimeString);
            WHLongestInMinutes = secondsToMinutes(parseTimeToSeconds(WHlongest));
            numberOfRows++;
        } else {
            WHminutes = 0;
        }
        if (!isNaN(WHresultDate.getTime())) {
            var WHformattedDate = formatDateAsDMY(WHresultDate);

            if (!WHaggregatedData[WHformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                WHaggregatedData[WHformattedDate] = { WHtotalValue: parseFloat(WHminutes) };
                WHaggregatedData2[WHformattedDate] = { WHtotalValue2: parseFloat(WHLongestInMinutes) };

            } else {
                // If the date already exists, update the existing entry
                WHaggregatedData[WHformattedDate].WHtotalValue += parseFloat(WHminutes);
                WHaggregatedData[WHformattedDate].WHtotalValue = WHaggregatedData[WHformattedDate].WHtotalValue / numberOfRows;
                if (WHaggregatedData2[WHformattedDate].WHtotalValue2 < parseFloat(WHLongestInMinutes)) {
                    WHaggregatedData2[WHformattedDate].WHtotalValue2 = parseFloat(WHLongestInMinutes);
                }
            }
        }
    });

    var WHmaxResult = WHfindMaxResult();
    var WHchartData = WHdateRange.map(WHresultDate => {
        var WHformattedDate = formatDateAsDMY(WHresultDate);
        var WHaggregatedDatum = WHaggregatedData[WHformattedDate];
        return WHaggregatedDatum ? WHaggregatedDatum.WHtotalValue : 0;
    });
    var longestRoundData = WHdateRange.map(WHresultDate => {
        var WHformattedDate2 = formatDateAsDMY(WHresultDate);
        var WHaggregatedDatum2 = WHaggregatedData2[WHformattedDate2];
        return WHaggregatedDatum2 ? WHaggregatedDatum2.WHtotalValue2 : 0;
    });

    return {
        WHchartData: WHchartData,
        WHmaxYValue: Math.floor(WHmaxResult + 1),
        WHselectedDataDatesYear: WHdateRange.map(formatDateAsDMY),
        longestRoundData: longestRoundData
    };
}
function WHupdateChart(WHstartDate, WHendDate) {
    var { WHchartData, WHmaxYValue, WHselectedDataDatesYear, longestRoundData } = WHupdateChartData(WHstartDate, WHendDate);

    // Update x-axis labels and chart data
    var WHselectedDataDatesMonthDay = WHselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    WHchart.data.labels = WHselectedDataDatesMonthDay;
    WHchart.data.datasets[0].data = WHchartData;
    WHchart.data.datasets[1].data = longestRoundData;
    WHchart.options.scales.yAxes[0].ticks.max = WHmaxYValue;
    function WHhandleBarClick(event, array) {
        var WHindex = array[0]._index; // Get the clicked bar index
        var WHselectedDate = WHselectedDataDatesYear[WHindex];
        WHdisplayDetailedInfo(WHselectedDate);
    }
    WHchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            WHhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        WHchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                WHhandleBarClick(event, array);
            }
        };
    }
    WHchart.update();
}
var WHnumberOfTests;
function WHupdateOverview() {
    WHnumberOfTests = 0;
    var WHmax = WHfindMaxResult();
    var WHmax2 = WHfindMaxResult2();
    var WHmaxAverage = WHfindMaxAverage();
    var WHinfoOverviewElements = document.getElementsByClassName('WHinfoOverview');
    fetchedDataArray.forEach(WHresultData => {
        var WHtimeString = WHresultData.whTotalTime;
        var WHdateString = WHresultData.whResultDate;
        // Check if the timeString is not empty before parsing
        if (WHtimeString !== undefined && WHtimeString !== '' && WHtimeString !== null) {
            var highestResult = WHgetHeightestNumber(WHtimeString);
            var WHseconds = parseTimeToSeconds(highestResult);            // Store the value of dateOfLongestResult when WHmax is updated
            if (WHseconds === WHmax2) {
                WHdateOfLongestResult = WHdateString;
            }
            WHnumberOfTests++;
        }
    });
    if (WHnumberOfTests !== 0) {
        WHinfoOverview.innerHTML = '';
        for (var i = 0; i < WHinfoOverviewElements.length; i++) {
            WHinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('WHContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('WHnumberOfSessions').value = WHnumberOfTests + ' Sess\u00F5es';
            document.getElementById('WHlongestRound').value = convertMinToMinSec(WHmax) + 'no dia ' + formatDateAsDMY(WHdateOfLongestResult);
            document.getElementById('WHlongestSession').value = convertMinToMinSec(secondsToMinutes(WHmaxAverage)) + ' em ' + WHLongestAverageIntervals + ' rounds no dia ' + formatDateAsDMY(WHlongestAverageDate);
        } else {
            document.getElementById('WHnumberOfSessions').value = WHnumberOfTests + ' Sessions';
            document.getElementById('WHlongestRound').value = convertMinToMinSec(WHmax) + 'on ' + formatDateAsDMY(WHdateOfLongestResult);
            document.getElementById('WHlongestSession').value = convertMinToMinSec(secondsToMinutes(WHmaxAverage)) + ' in ' + WHLongestAverageIntervals + ' rounds on ' + formatDateAsDMY(WHlongestAverageDate);
        }
        document.getElementById('WHaccordion').style.display = 'block';
    } else {
        document.getElementById('WHaccordion').style.display = 'none';
        if (isPortuguese) {
            WHinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            WHinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < WHinfoOverviewElements.length; i++) {
            WHinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('WHContainer').style.display = 'none';
    }
}
var WHresultPage = document.getElementById('WHresultPage'),
    WHresultDateHeader = document.getElementById('WHresultDateHeader'),
    WHresultSessions = document.getElementById('WHresultSessions');

function WHdisplayDetailedInfo(WHselectedDate) {
    function WHdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.WHdelete-form [name="resultId"][value="' + resultId + '"]').closest('.WHdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            WHupdateChart(WHstartDate, WHendDate);
                            WHupdateOverview();
                            openPage(WHresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backWHresults.style.display = "none";
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
    var WHnumberOfResults = 1;
    WHresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(WHresultData => {
        var WHtimeString = WHresultData.whTotalTime;
        var WHdateString = WHresultData.whResultDate;
        var WHresultId = WHresultData.resultId;
        // Check if the timeString is not empty before parsing
        if (WHtimeString !== undefined && WHtimeString !== '' && WHtimeString !== null) {
            var WHseconds = parseTimeToSeconds(WHgetAverage(WHtimeString));
            const parts = WHtimeString.split("|").filter(str => str !== "");
            if (WHselectedDate === formatDateAsDMY(WHdateString)) {
                if (isPortuguese) {
                    WHresultDateHeader.innerHTML = 'Resultados do dia ' + WHselectedDate;
                    WHresultSessions.innerHTML += '<div>Sess\u00E3o ' + WHnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        WHresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + convertMinToMinSec(secondsToMinutes(parseTimeToSeconds(parts[i]))) + '" readonly class="WHresultInput"/>';
                    }
                    WHresultSessions.innerHTML += '<input value="M\u00E9dia: ' + convertMinToMinSec(secondsToMinutes(WHseconds)) + ' " readonly class="WHresultInput"/>';
                    WHresultSessions.innerHTML += '<form method="post" class="WHdelete-form">' +
                        '<input name="resultId" value="' + WHresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger WHdelete-button" />' +
                        '</form>';
                } else {
                    WHresultDateHeader.innerHTML = 'Results on ' + WHselectedDate;
                    WHresultSessions.innerHTML += '<div>Session ' + WHnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        WHresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + convertMinToMinSec(secondsToMinutes(parseTimeToSeconds(parts[i]))) + '" readonly class="WHresultInput"/>';
                    }
                    WHresultSessions.innerHTML += '<input value="Average: ' + convertMinToMinSec(secondsToMinutes(WHseconds)) + ' " readonly class="WHresultInput"/>';
                    WHresultSessions.innerHTML += '<form method="post" class="WHdelete-form">' +
                        '<input name="resultId" value="' + WHresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger WHdelete-button" />' +
                        '</form>';
                }
                WHnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var WHdeleteButtons = document.querySelectorAll('.WHdelete-button');
    WHdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var WHform = this.closest('.WHdelete-form');
            var WHresultId = WHform.querySelector('[name="resultId"]').value;
            WHdeleteResult(WHresultId);
        });
    });

    openPage(resultsPage, WHresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backWHresults.style.display = "block";
    closeModalResults();
}
// END WH
// KB
function KBgetHeightestNumber(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Convert the array of time strings to an array of total seconds
    const timesInSeconds = timeStrings.map(timeString => {
        const [minutes, seconds] = timeString.split(":").map(Number);
        return minutes * 60 + seconds;
    });

    // Step 3: Find the highest time value in seconds
    const highestTimeInSeconds = Math.max(...timesInSeconds);

    // Step 4: Convert the highest time value back to the "minutes:seconds" format
    const highestMinutes = Math.floor(highestTimeInSeconds / 60);
    const highestSeconds = highestTimeInSeconds % 60;
    const highestTimeString = `${String(highestMinutes).padStart(2, '0')}:${String(highestSeconds).padStart(2, '0')}`;

    return highestTimeString;
}
function KBgetAverage(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Convert the array of time strings to an array of total seconds
    const timesInSeconds = timeStrings.map(timeString => {
        const [minutes, seconds] = timeString.split(":").map(Number);
        return minutes * 60 + seconds;
    });

    // Step 3: Calculate the average time value in seconds
    const totalSeconds = timesInSeconds.reduce((acc, time) => acc + time, 0);
    const averageTimeInSeconds = totalSeconds / timesInSeconds.length;

    // Step 4: Convert the average time value back to the "minutes:seconds" format
    const averageMinutes = Math.floor(averageTimeInSeconds / 60);
    const averageSeconds = Math.round(averageTimeInSeconds % 60); // Rounded to the nearest second
    const averageTimeString = `${String(averageMinutes).padStart(2, '0')}:${String(averageSeconds).padStart(2, '0')}`;


    return averageTimeString;
}
// Initialize startDate and endDate
var KBtoday = new Date();
var KBlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var KBresultDate = new Date(KBtoday);
    KBresultDate.setDate(KBtoday.getDate() - i);
    KBlast7Dates.push(KBresultDate); // Push the Date object directly
}

var KBendDate = KBlast7Dates[KBlast7Dates.length - 1]; // Initialize with the latest date
var KBstartDate = KBlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var KBtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var KBContainer = document.getElementById('KBContainer');
KBContainer.addEventListener('touchstart', function (event) {
    KBtouchStartX = event.touches[0].clientX;
});

var KBscrollThreshold = 10; // Adjust this value to control the scroll threshold

var KBlastScrollX = null;
var { KBchartData, KBmaxYValue, KBselectedDataDatesYear, longestRoundData } = KBupdateChartData(KBstartDate, KBendDate, fetchedDataArray);
var KBinfoOverview = document.getElementById('KBinfoOverview');
var KBdateOfLongestResult;
var KBLongestAverageIntervals;
var KBlongestAverageDate;
var KBchart;
function KBinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var KBdateA = new Date(a.KBresultDate);
        var KBdateB = new Date(b.KBresultDate);
        return KBdateA - KBdateB;
    });
    var KBselectedDataDatesMonthDay = KBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        KBchart = new Chart("KBchart", {
            type: "bar",
            data: {
                labels: KBselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: KBchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados de Kapalabhati " + "(" + getYear(KBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'M\u00E9dia: ' + convertMinToMinSec(Math.round(value * 100) / 100);
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Round mais longo: ' + convertMinToMinSec(Math.round(value * 100) / 100);
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: KBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        KBchart = new Chart("KBchart", {
            type: "bar",
            data: {
                labels: KBselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: KBchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your Kapalabhati results " + "(" + getYear(KBendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'Average: ' + convertMinToMinSec(Math.round(value * 100) / 100);
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Longest Round: ' + convertMinToMinSec(Math.round(value * 100) / 100);
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: KBmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    KBContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (KBtouchStartX !== null) {
            var KBtouchMoveX = event.touches[0].clientX;

            if (KBlastScrollX !== null) {
                var KBdelta = KBtouchMoveX - KBlastScrollX;

                if (Math.abs(KBdelta) >= KBscrollThreshold) {
                    KBlastScrollX = KBtouchMoveX;

                    if (KBdelta > 0) {
                        // Scroll right, decrease the date range
                        KBendDate.setDate(KBendDate.getDate() - 1);
                        KBstartDate.setDate(KBstartDate.getDate() - 1);
                        if (isPortuguese) {
                            KBchart.options.title.text = "Seus resultados de Kapalabhati " + "(" + getYear(KBendDate) + ")";
                        } else {
                            KBchart.options.title.text = "Your Kaplabhati results " + "(" + getYear(KBendDate) + ")";
                        }
                    } else if (KBdelta < 0) {
                        if (formatDateAsDMY(KBendDate) == formatDateAsDMY(KBtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            KBendDate.setDate(KBendDate.getDate() + 1);
                            KBstartDate.setDate(KBstartDate.getDate() + 1);
                            if (isPortuguese) {
                                KBchart.options.title.text = "Seus resultados de Kapalabhati " + "(" + getYear(KBendDate) + ")";
                            } else {
                                KBchart.options.title.text = "Your Kapalabhati results " + "(" + getYear(KBendDate) + ")";
                            }
                        }
                    }
                    KBupdateChart(KBstartDate, KBendDate);
                }
            } else {
                KBlastScrollX = KBtouchMoveX;
            }
        }
    });

    KBContainer.addEventListener('touchend', function () {
        KBlastScrollX = null;
    });
    KBContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var KBdelta = event.deltaX * 0.1;

        if (KBdelta < 0) {
            // Scroll left, decrease the date range
            KBendDate.setDate(KBendDate.getDate() - 1);
            KBstartDate.setDate(KBstartDate.getDate() - 1);
            if (isPortuguese) {
                KBchart.options.title.text = "Seus resultados de Kapalabhati " + "(" + getYear(KBendDate) + ")";
            } else {
                KBchart.options.title.text = "Your Kapalabhati results " + "(" + getYear(KBendDate) + ")";
            }
        } else if (KBdelta > 0) {
            if (formatDateAsDMY(KBendDate) == formatDateAsDMY(KBtoday)) { }
            else {
                // Scroll right, increase the date range
                KBendDate.setDate(KBendDate.getDate() + 1);
                KBstartDate.setDate(KBstartDate.getDate() + 1);
                if (isPortuguese) {
                    KBchart.options.title.text = "Seus resultados de Kapalabhati " + "(" + getYear(KBendDate) + ")";
                } else {
                    KBchart.options.title.text = "Your Kapalabhati results " + "(" + getYear(KBendDate) + ")";
                }
            }
        }
        KBupdateChart(KBstartDate, KBendDate);
    });
    KBupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    var numberOfClicks = 0;
    function KBhandleBarClick(event, array) {
        numberOfClicks++;
        var KBindex = array[0]._index; // Get the clicked bar index
        var KBselectedDate = KBselectedDataDatesYear[KBindex];
        KBdisplayDetailedInfo(KBselectedDate);
    }
    KBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            KBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        KBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                KBhandleBarClick(event, array);
            }
        };
    }
}

function KBfindMaxResult() {
    var KBmaxResult = 0;

    fetchedDataArray.forEach(KBresultData => {
        var KBtimeString = KBresultData.kbTotalTime;

        // Check if the timeString is not empty before parsing
        if (KBtimeString !== undefined && KBtimeString !== '' && KBtimeString !== null) {
            var highestResult = KBgetHeightestNumber(KBtimeString);
            var seconds = parseTimeToSeconds(highestResult);
            KBmaxResult = Math.max(KBmaxResult, secondsToMinutes(seconds));
        }
    });
    return KBmaxResult;
}
function KBfindMaxResult2() {
    var KBmaxResult = 0;

    fetchedDataArray.forEach(KBresultData => {
        var KBtimeString = KBresultData.kbTotalTime;

        // Check if the timeString is not empty before parsing
        if (KBtimeString !== undefined && KBtimeString !== '' && KBtimeString !== null) {
            var highestResult = KBgetHeightestNumber(KBtimeString);
            var seconds = parseTimeToSeconds(highestResult);
            KBmaxResult = Math.max(KBmaxResult, seconds);
        }
    });
    return KBmaxResult;
}
function KBfindMaxAverage() {
    var KBmaxResult = 0;

    fetchedDataArray.forEach(KBresultData => {
        var KBtimeString = KBresultData.kbTotalTime;
        var KBdateString = KBresultData.kbResultDate;
        var KBrounds = KBresultData.kbIntervals;
        // Check if the timeString is not empty before parsing
        if (KBtimeString !== undefined && KBtimeString !== '' && KBtimeString !== null) {
            var highestResult = KBgetAverage(KBtimeString);
            var seconds = parseTimeToSeconds(highestResult);
            KBmaxResult = Math.max(KBmaxResult, seconds);
            KBlongestAverageDate = KBdateString;
            KBLongestAverageIntervals = KBrounds;
        }
    });
    return KBmaxResult;
}
function KBupdateChartData(KBstartDate, KBendDate) {
    var KBdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var KBcurrentDate = new Date(KBstartDate);
    while (KBcurrentDate <= KBendDate) {
        KBdateRange.push(new Date(KBcurrentDate));
        KBcurrentDate.setDate(KBcurrentDate.getDate() + 1); // Move to the next day
    }

    var KBaggregatedData = {}; // Use an object to aggregate data by date
    var KBaggregatedData2 = {}; // Use an object to aggregate data by date

    fetchedDataArray.forEach(KBresultData => {
        var KBresultDate = new Date(KBresultData.kbResultDate);
        var KBseconds;
        var KBminutes;
        var KBlongest;
        var KBLongestInMinutes;
        var numberOfRows = 0;
        var KBtimeString = KBresultData.kbTotalTime;
        if (KBtimeString !== undefined && KBtimeString !== '' && KBtimeString !== null) {
            KBseconds = KBgetAverage(KBtimeString);
            KBminutes = secondsToMinutes(parseTimeToSeconds(KBseconds));
            KBlongest = KBgetHeightestNumber(KBtimeString);
            KBLongestInMinutes = secondsToMinutes(parseTimeToSeconds(KBlongest));
            numberOfRows++;
        } else {
            KBminutes = 0;
        }
        if (!isNaN(KBresultDate.getTime())) {
            var KBformattedDate = formatDateAsDMY(KBresultDate);

            if (!KBaggregatedData[KBformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                KBaggregatedData[KBformattedDate] = { KBtotalValue: parseFloat(KBminutes) };
                KBaggregatedData2[KBformattedDate] = { KBtotalValue2: parseFloat(KBLongestInMinutes) };

            } else {
                // If the date already exists, update the existing entry
                KBaggregatedData[KBformattedDate].KBtotalValue += parseFloat(KBminutes);
                KBaggregatedData[KBformattedDate].KBtotalValue = KBaggregatedData[KBformattedDate].KBtotalValue / numberOfRows;
                if (KBaggregatedData2[KBformattedDate].KBtotalValue2 < parseFloat(KBLongestInMinutes)) {
                    KBaggregatedData2[KBformattedDate].KBtotalValue2 = parseFloat(KBLongestInMinutes);
                }
            }
        }
    });

    var KBmaxResult = KBfindMaxResult();
    var KBchartData = KBdateRange.map(KBresultDate => {
        var KBformattedDate = formatDateAsDMY(KBresultDate);
        var KBaggregatedDatum = KBaggregatedData[KBformattedDate];
        return KBaggregatedDatum ? KBaggregatedDatum.KBtotalValue : 0;
    });
    var longestRoundData = KBdateRange.map(KBresultDate => {
        var KBformattedDate2 = formatDateAsDMY(KBresultDate);
        var KBaggregatedDatum2 = KBaggregatedData2[KBformattedDate2];
        return KBaggregatedDatum2 ? KBaggregatedDatum2.KBtotalValue2 : 0;
    });

    return {
        KBchartData: KBchartData,
        KBmaxYValue: Math.floor(KBmaxResult + 1),
        KBselectedDataDatesYear: KBdateRange.map(formatDateAsDMY),
        longestRoundData: longestRoundData
    };
}
function KBupdateChart(KBstartDate, KBendDate) {
    var { KBchartData, KBmaxYValue, KBselectedDataDatesYear, longestRoundData } = KBupdateChartData(KBstartDate, KBendDate);

    // Update x-axis labels and chart data
    var KBselectedDataDatesMonthDay = KBselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    KBchart.data.labels = KBselectedDataDatesMonthDay;
    KBchart.data.datasets[0].data = KBchartData;
    KBchart.data.datasets[1].data = longestRoundData;
    KBchart.options.scales.yAxes[0].ticks.max = KBmaxYValue;
    function KBhandleBarClick(event, array) {
        var KBindex = array[0]._index; // Get the clicked bar index
        var KBselectedDate = KBselectedDataDatesYear[KBindex];
        KBdisplayDetailedInfo(KBselectedDate);
    }
    KBchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            KBhandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        KBchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                KBhandleBarClick(event, array);
            }
        };
    }
    KBchart.update();
}
var KBnumberOfTests;
function KBupdateOverview() {
    KBnumberOfTests = 0;
    var KBmax = KBfindMaxResult();
    var KBmax2 = KBfindMaxResult2();
    var KBmaxAverage = KBfindMaxAverage();
    var KBinfoOverviewElements = document.getElementsByClassName('KBinfoOverview');
    fetchedDataArray.forEach(KBresultData => {
        var KBtimeString = KBresultData.kbTotalTime;
        var KBdateString = KBresultData.kbResultDate;
        // Check if the timeString is not empty before parsing
        if (KBtimeString !== undefined && KBtimeString !== '' && KBtimeString !== null) {
            var highestResult = KBgetHeightestNumber(KBtimeString);
            var KBseconds = parseTimeToSeconds(highestResult);            // Store the value of dateOfLongestResult when KBmax is updated
            if (KBseconds === KBmax2) {
                KBdateOfLongestResult = KBdateString;
            }
            KBnumberOfTests++;
        }
    });
    if (KBnumberOfTests !== 0) {
        KBinfoOverview.innerHTML = '';
        for (var i = 0; i < KBinfoOverviewElements.length; i++) {
            KBinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('KBContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('KBnumberOfSessions').value = KBnumberOfTests + ' Sess\u00F5es';
            document.getElementById('KBlongestRound').value = convertMinToMinSec(KBmax) + 'no dia ' + formatDateAsDMY(KBdateOfLongestResult);
            document.getElementById('KBlongestSession').value = convertMinToMinSec(secondsToMinutes(KBmaxAverage)) + ' em ' + KBLongestAverageIntervals + ' rounds no dia ' + formatDateAsDMY(KBlongestAverageDate);
        } else {
            document.getElementById('KBnumberOfSessions').value = KBnumberOfTests + ' Sessions';
            document.getElementById('KBlongestRound').value = convertMinToMinSec(KBmax) + 'on ' + formatDateAsDMY(KBdateOfLongestResult);
            document.getElementById('KBlongestSession').value = convertMinToMinSec(secondsToMinutes(KBmaxAverage)) + ' in ' + KBLongestAverageIntervals + ' rounds on ' + formatDateAsDMY(KBlongestAverageDate);
        }
        document.getElementById('KBaccordion').style.display = 'block';
    } else {
        document.getElementById('KBaccordion').style.display = 'none';
        if (isPortuguese) {
            KBinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            KBinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < KBinfoOverviewElements.length; i++) {
            KBinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('KBContainer').style.display = 'none';
    }
}
var KBresultPage = document.getElementById('KBresultPage'),
    KBresultDateHeader = document.getElementById('KBresultDateHeader'),
    KBresultSessions = document.getElementById('KBresultSessions');

function KBdisplayDetailedInfo(KBselectedDate) {
    function KBdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.KBdelete-form [name="resultId"][value="' + resultId + '"]').closest('.KBdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            KBupdateChart(KBstartDate, KBendDate);
                            KBupdateOverview();
                            openPage(KBresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backKBresults.style.display = "none";
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
    var KBnumberOfResults = 1;
    KBresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(KBresultData => {
        var KBtimeString = KBresultData.kbTotalTime;
        var KBdateString = KBresultData.kbResultDate;
        var KBresultId = KBresultData.resultId;
        // Check if the timeString is not empty before parsing
        if (KBtimeString !== undefined && KBtimeString !== '' && KBtimeString !== null) {
            var KBseconds = parseTimeToSeconds(KBgetAverage(KBtimeString));
            const parts = KBtimeString.split("|").filter(str => str !== "");
            if (KBselectedDate === formatDateAsDMY(KBdateString)) {
                if (isPortuguese) {
                    KBresultDateHeader.innerHTML = 'Resultados do dia ' + KBselectedDate;
                    KBresultSessions.innerHTML += '<div>Sess\u00E3o ' + KBnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        KBresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + convertMinToMinSec(secondsToMinutes(parseTimeToSeconds(parts[i]))) + '" readonly class="KBresultInput"/>';
                    }
                    KBresultSessions.innerHTML += '<input value="M\u00E9dia: ' + convertMinToMinSec(secondsToMinutes(KBseconds)) + ' " readonly class="KBresultInput"/>';
                    KBresultSessions.innerHTML += '<form method="post" class="KBdelete-form">' +
                        '<input name="resultId" value="' + KBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger KBdelete-button" />' +
                        '</form>';
                } else {
                    KBresultDateHeader.innerHTML = 'Results on ' + KBselectedDate;
                    KBresultSessions.innerHTML += '<div>Session ' + KBnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        KBresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + convertMinToMinSec(secondsToMinutes(parseTimeToSeconds(parts[i]))) + '" readonly class="KBresultInput"/>';
                    }
                    KBresultSessions.innerHTML += '<input value="Average: ' + convertMinToMinSec(secondsToMinutes(KBseconds)) + ' " readonly class="KBresultInput"/>';
                    KBresultSessions.innerHTML += '<form method="post" class="KBdelete-form">' +
                        '<input name="resultId" value="' + KBresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger KBdelete-button" />' +
                        '</form>';
                }
                KBnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var KBdeleteButtons = document.querySelectorAll('.KBdelete-button');
    KBdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var KBform = this.closest('.KBdelete-form');
            var KBresultId = KBform.querySelector('[name="resultId"]').value;
            KBdeleteResult(KBresultId);
        });
    });

    openPage(resultsPage, KBresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backKBresults.style.display = "block";
    closeModalResults();
}
// END KB
// HAT
function HATgetHeightestNumber(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Find the highest time value in seconds
    const highestTimeInSeconds = Math.max(...timeStrings);

    return highestTimeInSeconds;
}
function HATgetAverage(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Convert the array of time strings to an array of total seconds
    const timesInSeconds = timeStrings.map(timeString => {
        return Number(timeString); // Convert the string directly to a number (seconds)
    });

    // Step 3: Calculate the average time value in seconds
    const totalSeconds = timesInSeconds.reduce((acc, time) => acc + time, 0);
    const averageTimeInSeconds = totalSeconds / timesInSeconds.length;

    return averageTimeInSeconds;
}

// Initialize startDate and endDate
var HATtoday = new Date();
var HATlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var HATresultDate = new Date(HATtoday);
    HATresultDate.setDate(HATtoday.getDate() - i);
    HATlast7Dates.push(HATresultDate); // Push the Date object directly
}

var HATendDate = HATlast7Dates[HATlast7Dates.length - 1]; // Initialize with the latest date
var HATstartDate = HATlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var HATtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var HATContainer = document.getElementById('HATContainer');
HATContainer.addEventListener('touchstart', function (event) {
    HATtouchStartX = event.touches[0].clientX;
});

var HATscrollThreshold = 10; // Adjust this value to control the scroll threshold

var HATlastScrollX = null;
var { HATchartData, HATmaxYValue, HATselectedDataDatesYear, longestRoundData } = HATupdateChartData(HATstartDate, HATendDate, fetchedDataArray);
var HATinfoOverview = document.getElementById('HATinfoOverview');
var HATdateOfLongestResult;
var HATLongestAverageIntervals;
var HATlongestAverageDate;
var HATchart;
function HATinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var HATdateA = new Date(a.HATresultDate);
        var HATdateB = new Date(b.HATresultDate);
        return HATdateA - HATdateB;
    });
    var HATselectedDataDatesMonthDay = HATselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        HATchart = new Chart("HATchart", {
            type: "bar",
            data: {
                labels: HATselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: HATchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados de Treinamento em Alta Altitude " + "(" + getYear(HATendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'M\u00E9dia: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Round mais longo: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: HATmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        HATchart = new Chart("HATchart", {
            type: "bar",
            data: {
                labels: HATselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: HATchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your High Altitude Training results " + "(" + getYear(HATendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'Average: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Longest Round: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: HATmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    HATContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (HATtouchStartX !== null) {
            var HATtouchMoveX = event.touches[0].clientX;

            if (HATlastScrollX !== null) {
                var HATdelta = HATtouchMoveX - HATlastScrollX;

                if (Math.abs(HATdelta) >= HATscrollThreshold) {
                    HATlastScrollX = HATtouchMoveX;

                    if (HATdelta > 0) {
                        // Scroll right, decrease the date range
                        HATendDate.setDate(HATendDate.getDate() - 1);
                        HATstartDate.setDate(HATstartDate.getDate() - 1);
                        if (isPortuguese) {
                            HATchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude " + "(" + getYear(HATendDate) + ")";
                        } else {
                            HATchart.options.title.text = "Your High Altitude Training results " + "(" + getYear(HATendDate) + ")";
                        }
                    } else if (HATdelta < 0) {
                        if (formatDateAsDMY(HATendDate) == formatDateAsDMY(HATtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            HATendDate.setDate(HATendDate.getDate() + 1);
                            HATstartDate.setDate(HATstartDate.getDate() + 1);
                            if (isPortuguese) {
                                HATchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude " + "(" + getYear(HATendDate) + ")";
                            } else {
                                HATchart.options.title.text = "Your High Altitude Training results " + "(" + getYear(HATendDate) + ")";
                            }
                        }
                    }
                    HATupdateChart(HATstartDate, HATendDate);
                }
            } else {
                HATlastScrollX = HATtouchMoveX;
            }
        }
    });

    HATContainer.addEventListener('touchend', function () {
        HATlastScrollX = null;
    });
    HATContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var HATdelta = event.deltaX * 0.1;

        if (HATdelta < 0) {
            // Scroll left, decrease the date range
            HATendDate.setDate(HATendDate.getDate() - 1);
            HATstartDate.setDate(HATstartDate.getDate() - 1);
            if (isPortuguese) {
                HATchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude " + "(" + getYear(HATendDate) + ")";
            } else {
                HATchart.options.title.text = "Your High Altitude Training results " + "(" + getYear(HATendDate) + ")";
            }
        } else if (HATdelta > 0) {
            if (formatDateAsDMY(HATendDate) == formatDateAsDMY(HATtoday)) { }
            else {
                // Scroll right, increase the date range
                HATendDate.setDate(HATendDate.getDate() + 1);
                HATstartDate.setDate(HATstartDate.getDate() + 1);
                if (isPortuguese) {
                    HATchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude " + "(" + getYear(HATendDate) + ")";
                } else {
                    HATchart.options.title.text = "Your High Altitude Training results " + "(" + getYear(HATendDate) + ")";
                }
            }
        }
        HATupdateChart(HATstartDate, HATendDate);
    });
    HATupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function HAThandleBarClick(event, array) {
        var HATindex = array[0]._index; // Get the clicked bar index
        var HATselectedDate = HATselectedDataDatesYear[HATindex];
        HATdisplayDetailedInfo(HATselectedDate);
    }
    HATchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            HAThandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        HATchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                HAThandleBarClick(event, array);
            }
        };
    }
}

function HATfindMaxResult() {
    var HATmaxResult = 0;

    fetchedDataArray.forEach(HATresultData => {
        var HATtimeString = HATresultData.hatTotalTime;

        // Check if the timeString is not empty before parsing
        if (HATtimeString !== undefined && HATtimeString !== '' && HATtimeString !== null) {
            var highestResult = HATgetHeightestNumber(HATtimeString);
            HATmaxResult = Math.max(HATmaxResult, highestResult);
        }
    });
    return HATmaxResult;
}
function HATfindMaxAverage() {
    var HATmaxResult = 0;

    fetchedDataArray.forEach(HATresultData => {
        var HATtimeString = HATresultData.hatTotalTime;
        var HATdateString = HATresultData.hatResultDate;
        var HATrounds = HATresultData.hatIntervals;
        // Check if the timeString is not empty before parsing
        if (HATtimeString !== undefined && HATtimeString !== '' && HATtimeString !== null) {
            var highestResult = HATgetAverage(HATtimeString);
            HATmaxResult = Math.max(HATmaxResult, highestResult);
            HATlongestAverageDate = HATdateString;
            HATLongestAverageIntervals = HATrounds;
        }
    });
    return HATmaxResult;
}
function HATupdateChartData(HATstartDate, HATendDate) {
    var HATdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var HATcurrentDate = new Date(HATstartDate);
    while (HATcurrentDate <= HATendDate) {
        HATdateRange.push(new Date(HATcurrentDate));
        HATcurrentDate.setDate(HATcurrentDate.getDate() + 1); // Move to the next day
    }

    var HATaggregatedData = {}; // Use an object to aggregate data by date
    var HATaggregatedData2 = {}; // Use an object to aggregate data by date
    var numberOfRows = 0;
    fetchedDataArray.forEach(HATresultData => {
        var HATresultDate = new Date(HATresultData.hatResultDate);
        var HATseconds;
        var HATlongest;
        numberOfRows++;
        var HATtimeString = HATresultData.hatTotalTime;
        if (HATtimeString !== undefined && HATtimeString !== '' && HATtimeString !== null) {
            HATseconds = HATgetAverage(HATtimeString);
            HATlongest = HATgetHeightestNumber(HATtimeString);
        } else {
            HATminutes = 0;
        }
        if (!isNaN(HATresultDate.getTime())) {
            var HATformattedDate = formatDateAsDMY(HATresultDate);

            if (!HATaggregatedData[HATformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                HATaggregatedData[HATformattedDate] = { HATtotalValue: parseFloat(HATseconds) };
                HATaggregatedData2[HATformattedDate] = { HATtotalValue2: parseFloat(HATlongest) };

            } else {
                // If the date already exists, update the existing entry
                HATaggregatedData[HATformattedDate].HATtotalValue += parseFloat(HATseconds);
                HATaggregatedData[HATformattedDate].HATtotalValue = HATaggregatedData[HATformattedDate].HATtotalValue / numberOfRows;
                if (HATaggregatedData2[HATformattedDate].HATtotalValue2 < parseFloat(HATlongest)) {
                    HATaggregatedData2[HATformattedDate].HATtotalValue2 = parseFloat(HATlongest);
                }
            }
        }
    });

    var HATmaxResult = HATfindMaxResult();
    var HATchartData = HATdateRange.map(HATresultDate => {
        var HATformattedDate = formatDateAsDMY(HATresultDate);
        var HATaggregatedDatum = HATaggregatedData[HATformattedDate];
        return HATaggregatedDatum ? HATaggregatedDatum.HATtotalValue : 0;
    });
    var longestRoundData = HATdateRange.map(HATresultDate => {
        var HATformattedDate2 = formatDateAsDMY(HATresultDate);
        var HATaggregatedDatum2 = HATaggregatedData2[HATformattedDate2];
        return HATaggregatedDatum2 ? HATaggregatedDatum2.HATtotalValue2 : 0;
    });

    return {
        HATchartData: HATchartData,
        HATmaxYValue: Math.floor(HATmaxResult + 10),
        HATselectedDataDatesYear: HATdateRange.map(formatDateAsDMY),
        longestRoundData: longestRoundData
    };
}
function HATupdateChart(HATstartDate, HATendDate) {
    var { HATchartData, HATmaxYValue, HATselectedDataDatesYear, longestRoundData } = HATupdateChartData(HATstartDate, HATendDate);

    // Update x-axis labels and chart data
    var HATselectedDataDatesMonthDay = HATselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    HATchart.data.labels = HATselectedDataDatesMonthDay;
    HATchart.data.datasets[0].data = HATchartData;
    HATchart.data.datasets[1].data = longestRoundData;
    HATchart.options.scales.yAxes[0].ticks.max = HATmaxYValue;
    function HAThandleBarClick(event, array) {
        var HATindex = array[0]._index; // Get the clicked bar index
        var HATselectedDate = HATselectedDataDatesYear[HATindex];
        HATdisplayDetailedInfo(HATselectedDate);
    }
    HATchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            HAThandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        HATchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                HAThandleBarClick(event, array);
            }
        };
    }
    HATchart.update();
}
var HATnumberOfTests;
function HATupdateOverview() {
    HATnumberOfTests = 0;
    var HATmax = HATfindMaxResult();
    var HATmaxAverage = HATfindMaxAverage();
    var HATinfoOverviewElements = document.getElementsByClassName('HATinfoOverview');
    fetchedDataArray.forEach(HATresultData => {
        var HATtimeString = HATresultData.hatTotalTime;
        var HATdateString = HATresultData.hatResultDate;
        // Check if the timeString is not empty before parsing
        if (HATtimeString !== undefined && HATtimeString !== '' && HATtimeString !== null) {
            var highestResult = HATgetHeightestNumber(HATtimeString);
            if (highestResult === HATmax) {
                HATdateOfLongestResult = HATdateString;
            }
            HATnumberOfTests++;
        }
    });
    if (HATnumberOfTests !== 0) {
        HATinfoOverview.innerHTML = '';
        for (var i = 0; i < HATinfoOverviewElements.length; i++) {
            HATinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('HATContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('HATnumberOfSessions').value = HATnumberOfTests + ' Sess\u00F5es';
            document.getElementById('HATlongestRound').value = HATmax + ' segundos no dia ' + formatDateAsDMY(HATdateOfLongestResult);
            document.getElementById('HATlongestSession').value = HATmaxAverage + ' segundos em ' + HATLongestAverageIntervals + ' rounds no dia ' + formatDateAsDMY(HATlongestAverageDate);
        } else {
            document.getElementById('HATnumberOfSessions').value = HATnumberOfTests + ' Sessions';
            document.getElementById('HATlongestRound').value = HATmax + ' seconds on ' + formatDateAsDMY(HATdateOfLongestResult);
            document.getElementById('HATlongestSession').value = HATmaxAverage + ' seconds in ' + HATLongestAverageIntervals + ' rounds on ' + formatDateAsDMY(HATlongestAverageDate);
        }
        document.getElementById('HATaccordion').style.display = 'block';
    } else {
        document.getElementById('HATaccordion').style.display = 'none';
        if (isPortuguese) {
            HATinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            HATinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < HATinfoOverviewElements.length; i++) {
            HATinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('HATContainer').style.display = 'none';
    }
}
var HATresultPage = document.getElementById('HATresultPage'),
    HATresultDateHeader = document.getElementById('HATresultDateHeader'),
    HATresultSessions = document.getElementById('HATresultSessions');

function HATdisplayDetailedInfo(HATselectedDate) {
    function HATdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.HATdelete-form [name="resultId"][value="' + resultId + '"]').closest('.HATdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            HATupdateChart(HATstartDate, HATendDate);
                            HATupdateOverview();
                            openPage(HATresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHATresults.style.display = "none";
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
    var HATnumberOfResults = 1;
    HATresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(HATresultData => {
        var HATtimeString = HATresultData.hatTotalTime;
        var HATdateString = HATresultData.hatResultDate;
        var HATresultId = HATresultData.resultId;
        // Check if the timeString is not empty before parsing
        if (HATtimeString !== undefined && HATtimeString !== '' && HATtimeString !== null) {
            var HATseconds = HATgetAverage(HATtimeString);
            const parts = HATtimeString.split("|").filter(str => str !== "");
            if (HATselectedDate === formatDateAsDMY(HATdateString)) {
                if (isPortuguese) {
                    HATresultDateHeader.innerHTML = 'Resultados do dia ' + HATselectedDate;
                    HATresultSessions.innerHTML += '<div>Sess\u00E3o ' + HATnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        HATresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' segundos" readonly class="HATresultInput"/>';
                    }
                    HATresultSessions.innerHTML += '<input value="M\u00E9dia: ' + HATseconds + ' segundos" readonly class="HATresultInput"/>';
                    HATresultSessions.innerHTML += '<form method="post" class="HATdelete-form">' +
                        '<input name="resultId" value="' + HATresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger HATdelete-button" />' +
                        '</form>';
                } else {
                    HATresultDateHeader.innerHTML = 'Results on ' + HATselectedDate;
                    HATresultSessions.innerHTML += '<div>Session ' + HATnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        HATresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' seconds" readonly class="HATresultInput"/>';
                    }
                    HATresultSessions.innerHTML += '<input value="Average: ' + HATseconds + ' seconds" readonly class="HATresultInput"/>';
                    HATresultSessions.innerHTML += '<form method="post" class="HATdelete-form">' +
                        '<input name="resultId" value="' + HATresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger HATdelete-button" />' +
                        '</form>';
                }
                HATnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var HATdeleteButtons = document.querySelectorAll('.HATdelete-button');
    HATdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var HATform = this.closest('.HATdelete-form');
            var HATresultId = HATform.querySelector('[name="resultId"]').value;
            HATdeleteResult(HATresultId);
        });
    });

    openPage(resultsPage, HATresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backHATresults.style.display = "block";
    closeModalResults();
}
// END HAT
// HATC
function HATCgetHeightestNumber(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Find the highest time value in seconds
    const highestTimeInSeconds = Math.max(...timeStrings);

    return highestTimeInSeconds;
}
function HATCgetAverage(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Convert the array of time strings to an array of total seconds
    const timesInSeconds = timeStrings.map(timeString => {
        return Number(timeString); // Convert the string directly to a number (seconds)
    });

    // Step 3: Calculate the average time value in seconds
    const totalSeconds = timesInSeconds.reduce((acc, time) => acc + time, 0);
    const averageTimeInSeconds = totalSeconds / timesInSeconds.length;

    return averageTimeInSeconds;
}

// Initialize startDate and endDate
var HATCtoday = new Date();
var HATClast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var HATCresultDate = new Date(HATCtoday);
    HATCresultDate.setDate(HATCtoday.getDate() - i);
    HATClast7Dates.push(HATCresultDate); // Push the Date object directly
}

var HATCendDate = HATClast7Dates[HATClast7Dates.length - 1]; // Initialize with the latest date
var HATCstartDate = HATClast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var HATCtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var HATCContainer = document.getElementById('HATCContainer');
HATCContainer.addEventListener('touchstart', function (event) {
    HATCtouchStartX = event.touches[0].clientX;
});

var HATCscrollThreshold = 10; // Adjust this value to control the scroll threshold

var HATClastScrollX = null;
var { HATCchartData, HATCmaxYValue, HATCselectedDataDatesYear, longestRoundData } = HATCupdateChartData(HATCstartDate, HATCendDate, fetchedDataArray);
var HATCinfoOverview = document.getElementById('HATCinfoOverview');
var HATCdateOfLongestResult;
var HATCLongestAverageIntervals;
var HATClongestAverageDate;
var HATCchart;
function HATCinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var HATCdateA = new Date(a.HATCresultDate);
        var HATCdateB = new Date(b.HATCresultDate);
        return HATCdateA - HATCdateB;
    });
    var HATCselectedDataDatesMonthDay = HATCselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        HATCchart = new Chart("HATCchart", {
            type: "bar",
            data: {
                labels: HATCselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: HATCchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados de Treinamento em Alta Altitude Pedalando/Correndo " + "(" + getYear(HATCendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'M\u00E9dia: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Round mias longo: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: HATCmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        HATCchart = new Chart("HATCchart", {
            type: "bar",
            data: {
                labels: HATCselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: HATCchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your High Altitude Training Cycling/Running results " + "(" + getYear(HATCendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'Average: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Longest Round: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: HATCmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    HATCContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (HATCtouchStartX !== null) {
            var HATCtouchMoveX = event.touches[0].clientX;

            if (HATClastScrollX !== null) {
                var HATCdelta = HATCtouchMoveX - HATClastScrollX;

                if (Math.abs(HATCdelta) >= HATCscrollThreshold) {
                    HATClastScrollX = HATCtouchMoveX;

                    if (HATCdelta > 0) {
                        // Scroll right, decrease the date range
                        HATCendDate.setDate(HATCendDate.getDate() - 1);
                        HATCstartDate.setDate(HATCstartDate.getDate() - 1);
                        if (isPortuguese) {
                            HATCchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude Pedalando/Correndo " + "(" + getYear(HATCendDate) + ")";
                        } else {
                            HATCchart.options.title.text = "Your High Altitude Training Cycling/Running results " + "(" + getYear(HATCendDate) + ")";
                        }
                    } else if (HATCdelta < 0) {
                        if (formatDateAsDMY(HATCendDate) == formatDateAsDMY(HATCtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            HATCendDate.setDate(HATCendDate.getDate() + 1);
                            HATCstartDate.setDate(HATCstartDate.getDate() + 1);
                            if (isPortuguese) {
                                HATCchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude Pedalando/Correndo " + "(" + getYear(HATCendDate) + ")";
                            } else {
                                HATCchart.options.title.text = "Your High Altitude Training Cycling/Running results " + "(" + getYear(HATCendDate) + ")";
                            }
                        }
                    }
                    HATCupdateChart(HATCstartDate, HATCendDate);
                }
            } else {
                HATClastScrollX = HATCtouchMoveX;
            }
        }
    });

    HATCContainer.addEventListener('touchend', function () {
        HATClastScrollX = null;
    });
    HATCContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var HATCdelta = event.deltaX * 0.1;

        if (HATCdelta < 0) {
            // Scroll left, decrease the date range
            HATCendDate.setDate(HATCendDate.getDate() - 1);
            HATCstartDate.setDate(HATCstartDate.getDate() - 1);
            if (isPortuguese) {
                HATCchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude Pedalando/Correndo " + "(" + getYear(HATCendDate) + ")";
            } else {
                HATCchart.options.title.text = "Your High Altitude Training Cycling/Running results " + "(" + getYear(HATCendDate) + ")";
            }
        } else if (HATCdelta > 0) {
            if (formatDateAsDMY(HATCendDate) == formatDateAsDMY(HATCtoday)) { }
            else {
                // Scroll right, increase the date range
                HATCendDate.setDate(HATCendDate.getDate() + 1);
                HATCstartDate.setDate(HATCstartDate.getDate() + 1);
                if (isPortuguese) {
                    HATCchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude Pedalando/Correndo " + "(" + getYear(HATCendDate) + ")";
                } else {
                    HATCchart.options.title.text = "Your High Altitude Training Cycling/Running results " + "(" + getYear(HATCendDate) + ")";
                }
            }
        }
        HATCupdateChart(HATCstartDate, HATCendDate);
    });
    HATCupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function HATChandleBarClick(event, array) {
        var HATCindex = array[0]._index; // Get the clicked bar index
        var HATCselectedDate = HATCselectedDataDatesYear[HATCindex];
        HATCdisplayDetailedInfo(HATCselectedDate);
    }
    HATCchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            HATChandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        HATCchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                HATChandleBarClick(event, array);
            }
        };
    }
}

function HATCfindMaxResult() {
    var HATCmaxResult = 0;

    fetchedDataArray.forEach(HATCresultData => {
        var HATCtimeString = HATCresultData.hatcTotalTime;

        // Check if the timeString is not empty before parsing
        if (HATCtimeString !== undefined && HATCtimeString !== '' && HATCtimeString !== null) {
            var highestResult = HATCgetHeightestNumber(HATCtimeString);
            HATCmaxResult = Math.max(HATCmaxResult, highestResult);
        }
    });
    return HATCmaxResult;
}
function HATCfindMaxAverage() {
    var HATCmaxResult = 0;

    fetchedDataArray.forEach(HATCresultData => {
        var HATCtimeString = HATCresultData.hatcTotalTime;
        var HATCdateString = HATCresultData.hatcResultDate;
        var HATCrounds = HATCresultData.hatcIntervals;
        // Check if the timeString is not empty before parsing
        if (HATCtimeString !== undefined && HATCtimeString !== '' && HATCtimeString !== null) {
            var highestResult = HATCgetAverage(HATCtimeString);
            HATCmaxResult = Math.max(HATCmaxResult, highestResult);
            HATClongestAverageDate = HATCdateString;
            HATCLongestAverageIntervals = HATCrounds;
        }
    });
    return HATCmaxResult;
}
function HATCupdateChartData(HATCstartDate, HATCendDate) {
    var HATCdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var HATCcurrentDate = new Date(HATCstartDate);
    while (HATCcurrentDate <= HATCendDate) {
        HATCdateRange.push(new Date(HATCcurrentDate));
        HATCcurrentDate.setDate(HATCcurrentDate.getDate() + 1); // Move to the next day
    }

    var HATCaggregatedData = {}; // Use an object to aggregate data by date
    var HATCaggregatedData2 = {}; // Use an object to aggregate data by date
    var numberOfRows = 0;
    fetchedDataArray.forEach(HATCresultData => {
        var HATCresultDate = new Date(HATCresultData.hatcResultDate);
        var HATCseconds;
        var HATClongest;
        numberOfRows++;
        var HATCtimeString = HATCresultData.hatcTotalTime;
        if (HATCtimeString !== undefined && HATCtimeString !== '' && HATCtimeString !== null) {
            HATCseconds = HATCgetAverage(HATCtimeString);
            HATClongest = HATCgetHeightestNumber(HATCtimeString);
        } else {
            HATCminutes = 0;
        }
        if (!isNaN(HATCresultDate.getTime())) {
            var HATCformattedDate = formatDateAsDMY(HATCresultDate);

            if (!HATCaggregatedData[HATCformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                HATCaggregatedData[HATCformattedDate] = { HATCtotalValue: parseFloat(HATCseconds) };
                HATCaggregatedData2[HATCformattedDate] = { HATCtotalValue2: parseFloat(HATClongest) };

            } else {
                // If the date already exists, update the existing entry
                HATCaggregatedData[HATCformattedDate].HATCtotalValue += parseFloat(HATCseconds);
                HATCaggregatedData[HATCformattedDate].HATCtotalValue = HATCaggregatedData[HATCformattedDate].HATCtotalValue / numberOfRows;
                if (HATCaggregatedData2[HATCformattedDate].HATCtotalValue2 < parseFloat(HATClongest)) {
                    HATCaggregatedData2[HATCformattedDate].HATCtotalValue2 = parseFloat(HATClongest);
                }
            }
        }
    });

    var HATCmaxResult = HATCfindMaxResult();
    var HATCchartData = HATCdateRange.map(HATCresultDate => {
        var HATCformattedDate = formatDateAsDMY(HATCresultDate);
        var HATCaggregatedDatum = HATCaggregatedData[HATCformattedDate];
        return HATCaggregatedDatum ? HATCaggregatedDatum.HATCtotalValue : 0;
    });
    var longestRoundData = HATCdateRange.map(HATCresultDate => {
        var HATCformattedDate2 = formatDateAsDMY(HATCresultDate);
        var HATCaggregatedDatum2 = HATCaggregatedData2[HATCformattedDate2];
        return HATCaggregatedDatum2 ? HATCaggregatedDatum2.HATCtotalValue2 : 0;
    });

    return {
        HATCchartData: HATCchartData,
        HATCmaxYValue: Math.floor(HATCmaxResult + 10),
        HATCselectedDataDatesYear: HATCdateRange.map(formatDateAsDMY),
        longestRoundData: longestRoundData
    };
}
function HATCupdateChart(HATCstartDate, HATCendDate) {
    var { HATCchartData, HATCmaxYValue, HATCselectedDataDatesYear, longestRoundData } = HATCupdateChartData(HATCstartDate, HATCendDate);

    // Update x-axis labels and chart data
    var HATCselectedDataDatesMonthDay = HATCselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    HATCchart.data.labels = HATCselectedDataDatesMonthDay;
    HATCchart.data.datasets[0].data = HATCchartData;
    HATCchart.data.datasets[1].data = longestRoundData;
    HATCchart.options.scales.yAxes[0].ticks.max = HATCmaxYValue;
    function HATChandleBarClick(event, array) {
        var HATCindex = array[0]._index; // Get the clicked bar index
        var HATCselectedDate = HATCselectedDataDatesYear[HATCindex];
        HATCdisplayDetailedInfo(HATCselectedDate);
    }
    HATCchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            HATChandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        HATCchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                HATChandleBarClick(event, array);
            }
        };
    }
    HATCchart.update();
}
var HATCnumberOfTests;
function HATCupdateOverview() {
    HATCnumberOfTests = 0;
    var HATCmax = HATCfindMaxResult();
    var HATCmaxAverage = HATCfindMaxAverage();
    var HATCinfoOverviewElements = document.getElementsByClassName('HATCinfoOverview');
    fetchedDataArray.forEach(HATCresultData => {
        var HATCtimeString = HATCresultData.hatcTotalTime;
        var HATCdateString = HATCresultData.hatcResultDate;
        // Check if the timeString is not empty before parsing
        if (HATCtimeString !== undefined && HATCtimeString !== '' && HATCtimeString !== null) {
            var highestResult = HATCgetHeightestNumber(HATCtimeString);
            if (highestResult === HATCmax) {
                HATCdateOfLongestResult = HATCdateString;
            }
            HATCnumberOfTests++;
        }
    });
    if (HATCnumberOfTests !== 0) {
        HATCinfoOverview.innerHTML = '';
        for (var i = 0; i < HATCinfoOverviewElements.length; i++) {
            HATCinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('HATCContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('HATCnumberOfSessions').value = HATCnumberOfTests + ' Sess\u00F5es';
            document.getElementById('HATClongestRound').value = HATCmax + ' segundos no dia ' + formatDateAsDMY(HATCdateOfLongestResult);
            document.getElementById('HATClongestSession').value = HATCmaxAverage + ' segundos em ' + HATCLongestAverageIntervals + ' rounds no dia ' + formatDateAsDMY(HATClongestAverageDate);
        } else {
            document.getElementById('HATCnumberOfSessions').value = HATCnumberOfTests + ' Sessions';
            document.getElementById('HATClongestRound').value = HATCmax + ' seconds on ' + formatDateAsDMY(HATCdateOfLongestResult);
            document.getElementById('HATClongestSession').value = HATCmaxAverage + ' seconds in ' + HATCLongestAverageIntervals + ' rounds on ' + formatDateAsDMY(HATClongestAverageDate);
        }
        document.getElementById('HATCaccordion').style.display = 'block';
    } else {
        document.getElementById('HATCaccordion').style.display = 'none';
        if (isPortuguese) {
            HATCinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            HATCinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < HATCinfoOverviewElements.length; i++) {
            HATCinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('HATCContainer').style.display = 'none';
    }
}
var HATCresultPage = document.getElementById('HATCresultPage'),
    HATCresultDateHeader = document.getElementById('HATCresultDateHeader'),
    HATCresultSessions = document.getElementById('HATCresultSessions');

function HATCdisplayDetailedInfo(HATCselectedDate) {
    function HATCdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.HATCdelete-form [name="resultId"][value="' + resultId + '"]').closest('.HATCdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            HATCupdateChart(HATCstartDate, HATCendDate);
                            HATCupdateOverview();
                            openPage(HATCresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backHATCresults.style.display = "none";
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
    var HATCnumberOfResults = 1;
    HATCresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(HATCresultData => {
        var HATCtimeString = HATCresultData.hatcTotalTime;
        var HATCdateString = HATCresultData.hatcResultDate;
        var HATCresultId = HATCresultData.resultId;
        // Check if the timeString is not empty before parsing
        if (HATCtimeString !== undefined && HATCtimeString !== '' && HATCtimeString !== null) {
            var HATCseconds = HATCgetAverage(HATCtimeString);
            const parts = HATCtimeString.split("|").filter(str => str !== "");
            if (HATCselectedDate === formatDateAsDMY(HATCdateString)) {
                if (isPortuguese) {
                    HATCresultDateHeader.innerHTML = 'Resultados do dia ' + HATCselectedDate;
                    HATCresultSessions.innerHTML += '<div>Sess\u00E3o ' + HATCnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        HATCresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' segundos" readonly class="HATCresultInput"/>';
                    }
                    HATCresultSessions.innerHTML += '<input value="M\u00E9dia: ' + HATCseconds + ' segundos" readonly class="HATCresultInput"/>';
                    HATCresultSessions.innerHTML += '<form method="post" class="HATCdelete-form">' +
                        '<input name="resultId" value="' + HATCresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger HATCdelete-button" />' +
                        '</form>';
                } else {
                    HATCresultDateHeader.innerHTML = 'Results on ' + HATCselectedDate;
                    HATCresultSessions.innerHTML += '<div>Session ' + HATCnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        HATCresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' seconds" readonly class="HATCresultInput"/>';
                    }
                    HATCresultSessions.innerHTML += '<input value="Average: ' + HATCseconds + ' seconds" readonly class="HATCresultInput"/>';
                    HATCresultSessions.innerHTML += '<form method="post" class="HATCdelete-form">' +
                        '<input name="resultId" value="' + HATCresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger HATCdelete-button" />' +
                        '</form>';
                }
                HATCnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var HATCdeleteButtons = document.querySelectorAll('.HATCdelete-button');
    HATCdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var HATCform = this.closest('.HATCdelete-form');
            var HATCresultId = HATCform.querySelector('[name="resultId"]').value;
            HATCdeleteResult(HATCresultId);
        });
    });

    openPage(resultsPage, HATCresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backHATCresults.style.display = "block";
    closeModalResults();
}
// END HATC
// AHAT
function AHATgetHeightestNumber(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Find the highest time value in seconds
    const highestTimeInSeconds = Math.max(...timeStrings);

    return highestTimeInSeconds;
}
function AHATgetAverage(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Convert the array of time strings to an array of total seconds
    const timesInSeconds = timeStrings.map(timeString => {
        return Number(timeString); // Convert the string directly to a number (seconds)
    });

    // Step 3: Calculate the average time value in seconds
    const totalSeconds = timesInSeconds.reduce((acc, time) => acc + time, 0);
    const averageTimeInSeconds = totalSeconds / timesInSeconds.length;

    return averageTimeInSeconds;
}

// Initialize startDate and endDate
var AHATtoday = new Date();
var AHATlast7Dates = [];
for (var i = 6; i >= 0; i--) {
    var AHATresultDate = new Date(AHATtoday);
    AHATresultDate.setDate(AHATtoday.getDate() - i);
    AHATlast7Dates.push(AHATresultDate); // Push the Date object directly
}

var AHATendDate = AHATlast7Dates[AHATlast7Dates.length - 1]; // Initialize with the latest date
var AHATstartDate = AHATlast7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var AHATtouchStartX = null;
// Add event listener for mouse wheel on the canvas
var AHATContainer = document.getElementById('AHATContainer');
AHATContainer.addEventListener('touchstart', function (event) {
    AHATtouchStartX = event.touches[0].clientX;
});

var AHATscrollThreshold = 10; // Adjust this value to control the scroll threshold

var AHATlastScrollX = null;
var { AHATchartData, AHATmaxYValue, AHATselectedDataDatesYear, longestRoundData } = AHATupdateChartData(AHATstartDate, AHATendDate, fetchedDataArray);
var AHATinfoOverview = document.getElementById('AHATinfoOverview');
var AHATdateOfLongestResult;
var AHATLongestAverageIntervals;
var AHATlongestAverageDate;
var AHATchart;
function AHATinitializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var AHATdateA = new Date(a.AHATresultDate);
        var AHATdateB = new Date(b.AHATresultDate);
        return AHATdateA - AHATdateB;
    });
    var AHATselectedDataDatesMonthDay = AHATselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        AHATchart = new Chart("AHATchart", {
            type: "bar",
            data: {
                labels: AHATselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: AHATchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados de Treinamento em Alta Altitude Avan\u00E7ado " + "(" + getYear(AHATendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'M\u00E9dia: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Round mais longo: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: AHATmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        AHATchart = new Chart("AHATchart", {
            type: "bar",
            data: {
                labels: AHATselectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: AHATchartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your Advanced High Altitude Training results " + "(" + getYear(AHATendDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'Average: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Longest Round: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: AHATmaxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    AHATContainer.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (AHATtouchStartX !== null) {
            var AHATtouchMoveX = event.touches[0].clientX;

            if (AHATlastScrollX !== null) {
                var AHATdelta = AHATtouchMoveX - AHATlastScrollX;

                if (Math.abs(AHATdelta) >= AHATscrollThreshold) {
                    AHATlastScrollX = AHATtouchMoveX;

                    if (AHATdelta > 0) {
                        // Scroll right, decrease the date range
                        AHATendDate.setDate(AHATendDate.getDate() - 1);
                        AHATstartDate.setDate(AHATstartDate.getDate() - 1);
                        if (isPortuguese) {
                            AHATchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude Avan\u00E7ado " + "(" + getYear(AHATendDate) + ")";
                        } else {
                            AHATchart.options.title.text = "Your Advanced High Altitude Training results " + "(" + getYear(AHATendDate) + ")";
                        }
                    } else if (AHATdelta < 0) {
                        if (formatDateAsDMY(AHATendDate) == formatDateAsDMY(AHATtoday)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            AHATendDate.setDate(AHATendDate.getDate() + 1);
                            AHATstartDate.setDate(AHATstartDate.getDate() + 1);
                            if (isPortuguese) {
                                AHATchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude Avan\u00E7ado " + "(" + getYear(AHATendDate) + ")";
                            } else {
                                AHATchart.options.title.text = "Your Advanced High Altitude Training results " + "(" + getYear(AHATendDate) + ")";
                            }
                        }
                    }
                    AHATupdateChart(AHATstartDate, AHATendDate);
                }
            } else {
                AHATlastScrollX = AHATtouchMoveX;
            }
        }
    });

    AHATContainer.addEventListener('touchend', function () {
        AHATlastScrollX = null;
    });
    AHATContainer.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var AHATdelta = event.deltaX * 0.1;

        if (AHATdelta < 0) {
            // Scroll left, decrease the date range
            AHATendDate.setDate(AHATendDate.getDate() - 1);
            AHATstartDate.setDate(AHATstartDate.getDate() - 1);
            if (isPortuguese) {

            } else {

            }
            if (isPortuguese) {
                AHATchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude Avan\u00E7ado " + "(" + getYear(AHATendDate) + ")";
            } else {
                AHATchart.options.title.text = "Your Advanced High Altitude Training results " + "(" + getYear(AHATendDate) + ")";
            }
        } else if (AHATdelta > 0) {
            if (formatDateAsDMY(AHATendDate) == formatDateAsDMY(AHATtoday)) { }
            else {
                // Scroll right, increase the date range
                AHATendDate.setDate(AHATendDate.getDate() + 1);
                AHATstartDate.setDate(AHATstartDate.getDate() + 1);
                if (isPortuguese) {
                    AHATchart.options.title.text = "Seus resultados de Treinamento em Alta Altitude Avan\u00E7ado " + "(" + getYear(AHATendDate) + ")";
                } else {
                    AHATchart.options.title.text = "Your Advanced High Altitude Training results " + "(" + getYear(AHATendDate) + ")";
                }
            }
        }
        AHATupdateChart(AHATstartDate, AHATendDate);
    });
    AHATupdateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function AHAThandleBarClick(event, array) {
        var AHATindex = array[0]._index; // Get the clicked bar index
        var AHATselectedDate = AHATselectedDataDatesYear[AHATindex];
        AHATdisplayDetailedInfo(AHATselectedDate);
    }
    AHATchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            AHAThandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        AHATchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                AHAThandleBarClick(event, array);
            }
        };
    }
}

function AHATfindMaxResult() {
    var AHATmaxResult = 0;

    fetchedDataArray.forEach(AHATresultData => {
        var AHATtimeString = AHATresultData.ahatTotalTime;

        // Check if the timeString is not empty before parsing
        if (AHATtimeString !== undefined && AHATtimeString !== '' && AHATtimeString !== null) {
            var highestResult = AHATgetHeightestNumber(AHATtimeString);
            AHATmaxResult = Math.max(AHATmaxResult, highestResult);
        }
    });
    return AHATmaxResult;
}
function AHATfindMaxAverage() {
    var AHATmaxResult = 0;

    fetchedDataArray.forEach(AHATresultData => {
        var AHATtimeString = AHATresultData.ahatTotalTime;
        var AHATdateString = AHATresultData.ahatResultDate;
        var AHATrounds = AHATresultData.ahatIntervals;
        // Check if the timeString is not empty before parsing
        if (AHATtimeString !== undefined && AHATtimeString !== '' && AHATtimeString !== null) {
            var highestResult = AHATgetAverage(AHATtimeString);
            AHATmaxResult = Math.max(AHATmaxResult, highestResult);
            AHATlongestAverageDate = AHATdateString;
            AHATLongestAverageIntervals = AHATrounds;
        }
    });
    return AHATmaxResult;
}
function AHATupdateChartData(AHATstartDate, AHATendDate) {
    var AHATdateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var AHATcurrentDate = new Date(AHATstartDate);
    while (AHATcurrentDate <= AHATendDate) {
        AHATdateRange.push(new Date(AHATcurrentDate));
        AHATcurrentDate.setDate(AHATcurrentDate.getDate() + 1); // Move to the next day
    }

    var AHATaggregatedData = {}; // Use an object to aggregate data by date
    var AHATaggregatedData2 = {}; // Use an object to aggregate data by date
    var numberOfRows = 0;
    fetchedDataArray.forEach(AHATresultData => {
        var AHATresultDate = new Date(AHATresultData.ahatResultDate);
        var AHATseconds;
        var AHATlongest;
        numberOfRows++;
        var AHATtimeString = AHATresultData.ahatTotalTime;
        if (AHATtimeString !== undefined && AHATtimeString !== '' && AHATtimeString !== null) {
            AHATseconds = AHATgetAverage(AHATtimeString);
            AHATlongest = AHATgetHeightestNumber(AHATtimeString);
        } else {
            AHATminutes = 0;
        }
        if (!isNaN(AHATresultDate.getTime())) {
            var AHATformattedDate = formatDateAsDMY(AHATresultDate);

            if (!AHATaggregatedData[AHATformattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                AHATaggregatedData[AHATformattedDate] = { AHATtotalValue: parseFloat(AHATseconds) };
                AHATaggregatedData2[AHATformattedDate] = { AHATtotalValue2: parseFloat(AHATlongest) };

            } else {
                // If the date already exists, update the existing entry
                AHATaggregatedData[AHATformattedDate].AHATtotalValue += parseFloat(AHATseconds);
                AHATaggregatedData[AHATformattedDate].AHATtotalValue = AHATaggregatedData[AHATformattedDate].AHATtotalValue / numberOfRows;
                if (AHATaggregatedData2[AHATformattedDate].AHATtotalValue2 < parseFloat(AHATlongest)) {
                    AHATaggregatedData2[AHATformattedDate].AHATtotalValue2 = parseFloat(AHATlongest);
                }
            }
        }
    });

    var AHATmaxResult = AHATfindMaxResult();
    var AHATchartData = AHATdateRange.map(AHATresultDate => {
        var AHATformattedDate = formatDateAsDMY(AHATresultDate);
        var AHATaggregatedDatum = AHATaggregatedData[AHATformattedDate];
        return AHATaggregatedDatum ? AHATaggregatedDatum.AHATtotalValue : 0;
    });
    var longestRoundData = AHATdateRange.map(AHATresultDate => {
        var AHATformattedDate2 = formatDateAsDMY(AHATresultDate);
        var AHATaggregatedDatum2 = AHATaggregatedData2[AHATformattedDate2];
        return AHATaggregatedDatum2 ? AHATaggregatedDatum2.AHATtotalValue2 : 0;
    });

    return {
        AHATchartData: AHATchartData,
        AHATmaxYValue: Math.floor(AHATmaxResult + 10),
        AHATselectedDataDatesYear: AHATdateRange.map(formatDateAsDMY),
        longestRoundData: longestRoundData
    };
}
function AHATupdateChart(AHATstartDate, AHATendDate) {
    var { AHATchartData, AHATmaxYValue, AHATselectedDataDatesYear, longestRoundData } = AHATupdateChartData(AHATstartDate, AHATendDate);

    // Update x-axis labels and chart data
    var AHATselectedDataDatesMonthDay = AHATselectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    AHATchart.data.labels = AHATselectedDataDatesMonthDay;
    AHATchart.data.datasets[0].data = AHATchartData;
    AHATchart.data.datasets[1].data = longestRoundData;
    AHATchart.options.scales.yAxes[0].ticks.max = AHATmaxYValue;
    function AHAThandleBarClick(event, array) {
        var AHATindex = array[0]._index; // Get the clicked bar index
        var AHATselectedDate = AHATselectedDataDatesYear[AHATindex];
        AHATdisplayDetailedInfo(AHATselectedDate);
    }
    AHATchart.options.onClick = function (event, array) {
        if (array.length > 0) {
            AHAThandleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        AHATchart.options.onClick = function (event, array) {
            if (array.length > 0) {
                AHAThandleBarClick(event, array);
            }
        };
    }
    AHATchart.update();
}
var AHATnumberOfTests;
function AHATupdateOverview() {
    AHATnumberOfTests = 0;
    var AHATmax = AHATfindMaxResult();
    var AHATmaxAverage = AHATfindMaxAverage();
    var AHATinfoOverviewElements = document.getElementsByClassName('AHATinfoOverview');
    fetchedDataArray.forEach(AHATresultData => {
        var AHATtimeString = AHATresultData.ahatTotalTime;
        var AHATdateString = AHATresultData.ahatResultDate;
        // Check if the timeString is not empty before parsing
        if (AHATtimeString !== undefined && AHATtimeString !== '' && AHATtimeString !== null) {
            var highestResult = AHATgetHeightestNumber(AHATtimeString);
            if (highestResult === AHATmax) {
                AHATdateOfLongestResult = AHATdateString;
            }
            AHATnumberOfTests++;
        }
    });
    if (AHATnumberOfTests !== 0) {
        AHATinfoOverview.innerHTML = '';
        for (var i = 0; i < AHATinfoOverviewElements.length; i++) {
            AHATinfoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('AHATContainer').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('AHATnumberOfSessions').value = AHATnumberOfTests + ' Sess\u00F5es';
            document.getElementById('AHATlongestRound').value = AHATmax + ' segundos no dia ' + formatDateAsDMY(AHATdateOfLongestResult);
            document.getElementById('AHATlongestSession').value = AHATmaxAverage + ' segundos em ' + AHATLongestAverageIntervals + ' rounds no dia ' + formatDateAsDMY(AHATlongestAverageDate);
        } else {
            document.getElementById('AHATnumberOfSessions').value = AHATnumberOfTests + ' Sessions';
            document.getElementById('AHATlongestRound').value = AHATmax + ' seconds on ' + formatDateAsDMY(AHATdateOfLongestResult);
            document.getElementById('AHATlongestSession').value = AHATmaxAverage + ' seconds in ' + AHATLongestAverageIntervals + ' rounds on ' + formatDateAsDMY(AHATlongestAverageDate);
        }
        document.getElementById('AHATaccordion').style.display = 'block';
    } else {
        document.getElementById('AHATaccordion').style.display = 'none';
        if (isPortuguese) {
            AHATinfoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            AHATinfoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < AHATinfoOverviewElements.length; i++) {
            AHATinfoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('AHATContainer').style.display = 'none';
    }
}
var AHATresultPage = document.getElementById('AHATresultPage'),
    AHATresultDateHeader = document.getElementById('AHATresultDateHeader'),
    AHATresultSessions = document.getElementById('AHATresultSessions');

function AHATdisplayDetailedInfo(AHATselectedDate) {
    function AHATdeleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.AHATdelete-form [name="resultId"][value="' + resultId + '"]').closest('.AHATdelete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            AHATupdateChart(AHATstartDate, AHATendDate);
                            AHATupdateOverview();
                            openPage(AHATresultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backAHATresults.style.display = "none";
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
    var AHATnumberOfResults = 1;
    AHATresultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(AHATresultData => {
        var AHATtimeString = AHATresultData.ahatTotalTime;
        var AHATdateString = AHATresultData.ahatResultDate;
        var AHATresultId = AHATresultData.resultId;
        // Check if the timeString is not empty before parsing
        if (AHATtimeString !== undefined && AHATtimeString !== '' && AHATtimeString !== null) {
            var AHATseconds = AHATgetAverage(AHATtimeString);
            const parts = AHATtimeString.split("|").filter(str => str !== "");
            if (AHATselectedDate === formatDateAsDMY(AHATdateString)) {
                if (isPortuguese) {
                    AHATresultDateHeader.innerHTML = 'Resultados do dia ' + AHATselectedDate;
                    AHATresultSessions.innerHTML += '<div>Sess\u00E3o ' + AHATnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        AHATresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' segundos" readonly class="AHATresultInput"/>';
                    }
                    AHATresultSessions.innerHTML += '<input value="M\u00E9dia: ' + AHATseconds + ' segundos" readonly class="AHATresultInput"/>';
                    AHATresultSessions.innerHTML += '<form method="post" class="AHATdelete-form">' +
                        '<input name="resultId" value="' + AHATresultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger AHATdelete-button" />' +
                        '</form>';
                } else {
                    AHATresultDateHeader.innerHTML = 'Results on ' + AHATselectedDate;
                    AHATresultSessions.innerHTML += '<div>Session ' + AHATnumberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        AHATresultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' seconds" readonly class="AHATresultInput"/>';
                    }
                    AHATresultSessions.innerHTML += '<input value="Average: ' + AHATseconds + ' seconds" readonly class="AHATresultInput"/>';
                    AHATresultSessions.innerHTML += '<form method="post" class="AHATdelete-form">' +
                        '<input name="resultId" value="' + AHATresultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger AHATdelete-button" />' +
                        '</form>';
                }
                AHATnumberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var AHATdeleteButtons = document.querySelectorAll('.AHATdelete-button');
    AHATdeleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var AHATform = this.closest('.AHATdelete-form');
            var AHATresultId = AHATform.querySelector('[name="resultId"]').value;
            AHATdeleteResult(AHATresultId);
        });
    });

    openPage(resultsPage, AHATresultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backAHATresults.style.display = "block";
    closeModalResults();
}
// END AHAT
// CO2
function CO2getHeightestNumber(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Find the highest time value in seconds
    const highestTimeInSeconds = Math.max(...timeStrings);

    return highestTimeInSeconds;
}
function CO2getAverage(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Convert the array of time strings to an array of total seconds
    const timesInSeconds = timeStrings.map(timeString => {
        return Number(timeString); // Convert the string directly to a number (seconds)
    });

    // Step 3: Calculate the average time value in seconds
    const totalSeconds = timesInSeconds.reduce((acc, time) => acc + time, 0);
    const averageTimeInSeconds = totalSeconds / timesInSeconds.length;

    return averageTimeInSeconds;
}

// Initialize startDate and endDate
var CO2today = new Date();
var CO2last7Dates = [];
for (var i = 6; i >= 0; i--) {
    var CO2resultDate = new Date(CO2today);
    CO2resultDate.setDate(CO2today.getDate() - i);
    CO2last7Dates.push(CO2resultDate); // Push the Date object directly
}

var CO2endDate = CO2last7Dates[CO2last7Dates.length - 1]; // Initialize with the latest date
var CO2startDate = CO2last7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var CO2touchStartX = null;
// Add event listener for mouse wheel on the canvas
var CO2Container = document.getElementById('CO2Container');
CO2Container.addEventListener('touchstart', function (event) {
    CO2touchStartX = event.touches[0].clientX;
});

var CO2scrollThreshold = 10; // Adjust this value to control the scroll threshold

var CO2lastScrollX = null;
var { CO2chartData, CO2maxYValue, CO2selectedDataDatesYear, longestRoundData } = CO2updateChartData(CO2startDate, CO2endDate, fetchedDataArray);
var CO2infoOverview = document.getElementById('CO2infoOverview');
var CO2dateOfLongestResult;
var CO2LongestAverageIntervals;
var CO2longestAverageDate;
var CO2chart;
function CO2initializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var CO2dateA = new Date(a.CO2resultDate);
        var CO2dateB = new Date(b.CO2resultDate);
        return CO2dateA - CO2dateB;
    });
    var CO2selectedDataDatesMonthDay = CO2selectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        CO2chart = new Chart("CO2chart", {
            type: "bar",
            data: {
                labels: CO2selectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: CO2chartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(CO2endDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'M\u00E9dia: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Round mais longo: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: CO2maxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        CO2chart = new Chart("CO2chart", {
            type: "bar",
            data: {
                labels: CO2selectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: CO2chartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your CO2 Table Training results " + "(" + getYear(CO2endDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'Average: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Longest Round: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: CO2maxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    CO2Container.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (CO2touchStartX !== null) {
            var CO2touchMoveX = event.touches[0].clientX;

            if (CO2lastScrollX !== null) {
                var CO2delta = CO2touchMoveX - CO2lastScrollX;

                if (Math.abs(CO2delta) >= CO2scrollThreshold) {
                    CO2lastScrollX = CO2touchMoveX;

                    if (CO2delta > 0) {
                        // Scroll right, decrease the date range
                        CO2endDate.setDate(CO2endDate.getDate() - 1);
                        CO2startDate.setDate(CO2startDate.getDate() - 1);
                        if (isPortuguese) {
                            CO2chart.options.title.text = "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(CO2endDate) + ")";
                        } else {
                            CO2chart.options.title.text = "Your CO2 Table Training results " + "(" + getYear(CO2endDate) + ")";
                        }
                    } else if (CO2delta < 0) {
                        if (formatDateAsDMY(CO2endDate) == formatDateAsDMY(CO2today)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            CO2endDate.setDate(CO2endDate.getDate() + 1);
                            CO2startDate.setDate(CO2startDate.getDate() + 1);
                            if (isPortuguese) {
                                CO2chart.options.title.text = "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(CO2endDate) + ")";
                            } else {
                                CO2chart.options.title.text = "Your CO2 Table Training results " + "(" + getYear(CO2endDate) + ")";
                            }
                        }
                    }
                    CO2updateChart(CO2startDate, CO2endDate);
                }
            } else {
                CO2lastScrollX = CO2touchMoveX;
            }
        }
    });

    CO2Container.addEventListener('touchend', function () {
        CO2lastScrollX = null;
    });
    CO2Container.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var CO2delta = event.deltaX * 0.1;

        if (CO2delta < 0) {
            // Scroll left, decrease the date range
            CO2endDate.setDate(CO2endDate.getDate() - 1);
            CO2startDate.setDate(CO2startDate.getDate() - 1);
            if (isPortuguese) {
                CO2chart.options.title.text = "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(CO2endDate) + ")";
            } else {
                CO2chart.options.title.text = "Your CO2 Table Training results " + "(" + getYear(CO2endDate) + ")";
            }
        } else if (CO2delta > 0) {
            if (formatDateAsDMY(CO2endDate) == formatDateAsDMY(CO2today)) { }
            else {
                // Scroll right, increase the date range
                CO2endDate.setDate(CO2endDate.getDate() + 1);
                CO2startDate.setDate(CO2startDate.getDate() + 1);
                if (isPortuguese) {
                    CO2chart.options.title.text = "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(CO2endDate) + ")";
                } else {
                    CO2chart.options.title.text = "Your CO2 Table Training results " + "(" + getYear(CO2endDate) + ")";
                }
            }
        }
        CO2updateChart(CO2startDate, CO2endDate);
    });
    CO2updateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function CO2handleBarClick(event, array) {
        var CO2index = array[0]._index; // Get the clicked bar index
        var CO2selectedDate = CO2selectedDataDatesYear[CO2index];
        CO2displayDetailedInfo(CO2selectedDate);
    }
    CO2chart.options.onClick = function (event, array) {
        if (array.length > 0) {
            CO2handleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        CO2chart.options.onClick = function (event, array) {
            if (array.length > 0) {
                CO2handleBarClick(event, array);
            }
        };
    }
}

function CO2findMaxResult() {
    var CO2maxResult = 0;

    fetchedDataArray.forEach(CO2resultData => {
        var CO2timeString = CO2resultData.co2TotalTime;

        // Check if the timeString is not empty before parsing
        if (CO2timeString !== undefined && CO2timeString !== '' && CO2timeString !== null) {
            var highestResult = CO2getHeightestNumber(CO2timeString);
            CO2maxResult = Math.max(CO2maxResult, highestResult);
        }
    });
    return CO2maxResult;
}
function CO2findMaxAverage() {
    var CO2maxResult = 0;

    fetchedDataArray.forEach(CO2resultData => {
        var CO2timeString = CO2resultData.co2TotalTime;
        var CO2dateString = CO2resultData.co2ResultDate;
        var CO2rounds = CO2resultData.co2Intervals;
        // Check if the timeString is not empty before parsing
        if (CO2timeString !== undefined && CO2timeString !== '' && CO2timeString !== null) {
            var highestResult = CO2getAverage(CO2timeString);
            CO2maxResult = Math.max(CO2maxResult, highestResult);
            CO2longestAverageDate = CO2dateString;
            CO2LongestAverageIntervals = CO2rounds;
        }
    });
    return CO2maxResult;
}
function CO2updateChartData(CO2startDate, CO2endDate) {
    var CO2dateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var CO2currentDate = new Date(CO2startDate);
    while (CO2currentDate <= CO2endDate) {
        CO2dateRange.push(new Date(CO2currentDate));
        CO2currentDate.setDate(CO2currentDate.getDate() + 1); // Move to the next day
    }

    var CO2aggregatedData = {}; // Use an object to aggregate data by date
    var CO2aggregatedData2 = {}; // Use an object to aggregate data by date
    var numberOfRows = 0;
    fetchedDataArray.forEach(CO2resultData => {
        var CO2resultDate = new Date(CO2resultData.co2ResultDate);
        var CO2seconds;
        var CO2longest;
        numberOfRows++;
        var CO2timeString = CO2resultData.co2TotalTime;
        if (CO2timeString !== undefined && CO2timeString !== '' && CO2timeString !== null) {
            CO2seconds = CO2getAverage(CO2timeString);
            CO2longest = CO2getHeightestNumber(CO2timeString);
        } else {
            CO2minutes = 0;
        }
        if (!isNaN(CO2resultDate.getTime())) {
            var CO2formattedDate = formatDateAsDMY(CO2resultDate);

            if (!CO2aggregatedData[CO2formattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                CO2aggregatedData[CO2formattedDate] = { CO2totalValue: parseFloat(CO2seconds) };
                CO2aggregatedData2[CO2formattedDate] = { CO2totalValue2: parseFloat(CO2longest) };

            } else {
                // If the date already exists, update the existing entry
                CO2aggregatedData[CO2formattedDate].CO2totalValue += parseFloat(CO2seconds);
                CO2aggregatedData[CO2formattedDate].CO2totalValue = CO2aggregatedData[CO2formattedDate].CO2totalValue / numberOfRows;
                if (CO2aggregatedData2[CO2formattedDate].CO2totalValue2 < parseFloat(CO2longest)) {
                    CO2aggregatedData2[CO2formattedDate].CO2totalValue2 = parseFloat(CO2longest);
                }
            }
        }
    });

    var CO2maxResult = CO2findMaxResult();
    var CO2chartData = CO2dateRange.map(CO2resultDate => {
        var CO2formattedDate = formatDateAsDMY(CO2resultDate);
        var CO2aggregatedDatum = CO2aggregatedData[CO2formattedDate];
        return CO2aggregatedDatum ? CO2aggregatedDatum.CO2totalValue : 0;
    });
    var longestRoundData = CO2dateRange.map(CO2resultDate => {
        var CO2formattedDate2 = formatDateAsDMY(CO2resultDate);
        var CO2aggregatedDatum2 = CO2aggregatedData2[CO2formattedDate2];
        return CO2aggregatedDatum2 ? CO2aggregatedDatum2.CO2totalValue2 : 0;
    });

    return {
        CO2chartData: CO2chartData,
        CO2maxYValue: Math.floor(CO2maxResult + 10),
        CO2selectedDataDatesYear: CO2dateRange.map(formatDateAsDMY),
        longestRoundData: longestRoundData
    };
}
function CO2updateChart(CO2startDate, CO2endDate) {
    var { CO2chartData, CO2maxYValue, CO2selectedDataDatesYear, longestRoundData } = CO2updateChartData(CO2startDate, CO2endDate);

    // Update x-axis labels and chart data
    var CO2selectedDataDatesMonthDay = CO2selectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    CO2chart.data.labels = CO2selectedDataDatesMonthDay;
    CO2chart.data.datasets[0].data = CO2chartData;
    CO2chart.data.datasets[1].data = longestRoundData;
    CO2chart.options.scales.yAxes[0].ticks.max = CO2maxYValue;
    function CO2handleBarClick(event, array) {
        var CO2index = array[0]._index; // Get the clicked bar index
        var CO2selectedDate = CO2selectedDataDatesYear[CO2index];
        CO2displayDetailedInfo(CO2selectedDate);
    }
    CO2chart.options.onClick = function (event, array) {
        if (array.length > 0) {
            CO2handleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        CO2chart.options.onClick = function (event, array) {
            if (array.length > 0) {
                CO2handleBarClick(event, array);
            }
        };
    }
    CO2chart.update();
}
var CO2numberOfTests;
function CO2updateOverview() {
    CO2numberOfTests = 0;
    var CO2max = CO2findMaxResult();
    var CO2maxAverage = CO2findMaxAverage();
    var CO2infoOverviewElements = document.getElementsByClassName('CO2infoOverview');
    fetchedDataArray.forEach(CO2resultData => {
        var CO2timeString = CO2resultData.co2TotalTime;
        var CO2dateString = CO2resultData.co2ResultDate;
        // Check if the timeString is not empty before parsing
        if (CO2timeString !== undefined && CO2timeString !== '' && CO2timeString !== null) {
            var highestResult = CO2getHeightestNumber(CO2timeString);
            if (highestResult === CO2max) {
                CO2dateOfLongestResult = CO2dateString;
            }
            CO2numberOfTests++;
        }
    });
    if (CO2numberOfTests !== 0) {
        CO2infoOverview.innerHTML = '';
        for (var i = 0; i < CO2infoOverviewElements.length; i++) {
            CO2infoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('CO2Container').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('CO2numberOfSessions').value = CO2numberOfTests + ' Sess\u00F5es';
            document.getElementById('CO2longestRound').value = CO2max + ' segundos no dia ' + formatDateAsDMY(CO2dateOfLongestResult);
            document.getElementById('CO2longestSession').value = CO2maxAverage + ' segundos em ' + CO2LongestAverageIntervals + ' rounds no dia ' + formatDateAsDMY(CO2longestAverageDate);
        } else {
            document.getElementById('CO2numberOfSessions').value = CO2numberOfTests + ' Sessions';
            document.getElementById('CO2longestRound').value = CO2max + ' seconds on ' + formatDateAsDMY(CO2dateOfLongestResult);
            document.getElementById('CO2longestSession').value = CO2maxAverage + ' seconds in ' + CO2LongestAverageIntervals + ' rounds on ' + formatDateAsDMY(CO2longestAverageDate);
        }
        document.getElementById('CO2accordion').style.display = 'block';
    } else {
        document.getElementById('CO2accordion').style.display = 'none';
        if (isPortuguese) {
            CO2infoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            CO2infoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < CO2infoOverviewElements.length; i++) {
            CO2infoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('CO2Container').style.display = 'none';
    }
}
var CO2resultPage = document.getElementById('CO2resultPage'),
    CO2resultDateHeader = document.getElementById('CO2resultDateHeader'),
    CO2resultSessions = document.getElementById('CO2resultSessions');

function CO2displayDetailedInfo(CO2selectedDate) {
    function CO2deleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.CO2delete-form [name="resultId"][value="' + resultId + '"]').closest('.CO2delete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            CO2updateChart(CO2startDate, CO2endDate);
                            CO2updateOverview();
                            openPage(CO2resultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backCO2results.style.display = "none";
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
    var CO2numberOfResults = 1;
    CO2resultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(CO2resultData => {
        var CO2timeString = CO2resultData.co2TotalTime;
        var CO2dateString = CO2resultData.co2ResultDate;
        var CO2resultId = CO2resultData.resultId;
        // Check if the timeString is not empty before parsing
        if (CO2timeString !== undefined && CO2timeString !== '' && CO2timeString !== null) {
            var CO2seconds = CO2getAverage(CO2timeString);
            const parts = CO2timeString.split("|").filter(str => str !== "");
            if (CO2selectedDate === formatDateAsDMY(CO2dateString)) {
                if (isPortuguese) {
                    CO2resultDateHeader.innerHTML = 'Resultados do dia ' + CO2selectedDate;
                    CO2resultSessions.innerHTML += '<div>Sess\u00E3o ' + CO2numberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        CO2resultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' segundos" readonly class="CO2resultInput"/>';
                    }
                    CO2resultSessions.innerHTML += '<input value="M\u00E9dia: ' + CO2seconds + ' segundos" readonly class="CO2resultInput"/>';
                    CO2resultSessions.innerHTML += '<form method="post" class="CO2delete-form">' +
                        '<input name="resultId" value="' + CO2resultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger CO2delete-button" />' +
                        '</form>';
                } else {
                    CO2resultDateHeader.innerHTML = 'Results on ' + CO2selectedDate;
                    CO2resultSessions.innerHTML += '<div>Session ' + CO2numberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        CO2resultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' seconds" readonly class="CO2resultInput"/>';
                    }
                    CO2resultSessions.innerHTML += '<input value="Average: ' + CO2seconds + ' seconds" readonly class="CO2resultInput"/>';
                    CO2resultSessions.innerHTML += '<form method="post" class="CO2delete-form">' +
                        '<input name="resultId" value="' + CO2resultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger CO2delete-button" />' +
                        '</form>';
                }
                CO2numberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var CO2deleteButtons = document.querySelectorAll('.CO2delete-button');
    CO2deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var CO2form = this.closest('.CO2delete-form');
            var CO2resultId = CO2form.querySelector('[name="resultId"]').value;
            CO2deleteResult(CO2resultId);
        });
    });

    openPage(resultsPage, CO2resultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backCO2results.style.display = "block";
    closeModalResults();
}
// END CO2
// O2
function O2getHeightestNumber(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Find the highest time value in seconds
    const highestTimeInSeconds = Math.max(...timeStrings);

    return highestTimeInSeconds;
}
function O2getAverage(inputString) {
    // Step 1: Split the string into an array based on the "|" character
    const timeStrings = inputString.split("|").filter(str => str !== "");

    // Step 2: Convert the array of time strings to an array of total seconds
    const timesInSeconds = timeStrings.map(timeString => {
        return Number(timeString); // Convert the string directly to a number (seconds)
    });

    // Step 3: Calculate the average time value in seconds
    const totalSeconds = timesInSeconds.reduce((acc, time) => acc + time, 0);
    const averageTimeInSeconds = totalSeconds / timesInSeconds.length;

    return averageTimeInSeconds;
}

// Initialize startDate and endDate
var O2today = new Date();
var O2last7Dates = [];
for (var i = 6; i >= 0; i--) {
    var O2resultDate = new Date(O2today);
    O2resultDate.setDate(O2today.getDate() - i);
    O2last7Dates.push(O2resultDate); // Push the Date object directly
}

var O2endDate = O2last7Dates[O2last7Dates.length - 1]; // Initialize with the latest date
var O2startDate = O2last7Dates[0]; // Initialize with the earliest date
// Initialize variables to track touch start position
var O2touchStartX = null;
// Add event listener for mouse wheel on the canvas
var O2Container = document.getElementById('O2Container');
O2Container.addEventListener('touchstart', function (event) {
    O2touchStartX = event.touches[0].clientX;
});

var O2scrollThreshold = 10; // Adjust this value to control the scroll threshold

var O2lastScrollX = null;
var { O2chartData, O2maxYValue, O2selectedDataDatesYear, longestRoundData } = O2updateChartData(O2startDate, O2endDate, fetchedDataArray);
var O2infoOverview = document.getElementById('O2infoOverview');
var O2dateOfLongestResult;
var O2LongestAverageIntervals;
var O2longestAverageDate;
var O2chart;
function O2initializeChart() {
    // Sort the fetched data by date in ascending order
    fetchedDataArray.sort(function (a, b) {
        var O2dateA = new Date(a.O2resultDate);
        var O2dateB = new Date(b.O2resultDate);
        return O2dateA - O2dateB;
    });
    var O2selectedDataDatesMonthDay = O2selectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);
    if (isPortuguese) {
        // Initialize chart using initial dates
        O2chart = new Chart("O2chart", {
            type: "bar",
            data: {
                labels: O2selectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: O2chartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(O2endDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'M\u00E9dia: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Round mias longo: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: O2maxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    } else {
        // Initialize chart using initial dates
        O2chart = new Chart("O2chart", {
            type: "bar",
            data: {
                labels: O2selectedDataDatesMonthDay,
                datasets: [{
                    label: "Average",
                    backgroundColor: '#49B79D',
                    data: O2chartData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                },
                {
                    label: "Longest Round",
                    backgroundColor: '#0661AA',
                    data: longestRoundData,
                    barPercentage: 0.9,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                legend: { display: false }, // Display the legend
                title: {
                    display: true,
                    text: "Your O2 Table Training results " + "(" + getYear(O2endDate) + ")",
                    font: {

                        size: 14 // Change to your desired font size
                    },
                    fontColor: '#0661AA', // Change to your desired font color
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return '';
                        },
                        label: function (tooltipItem, data) {
                            const datasetIndex = tooltipItem.datasetIndex;
                            const value = data.datasets[datasetIndex].data[tooltipItem.index];

                            if (datasetIndex === 0) {
                                // This is the "Average" dataset
                                return 'Average: ' + Math.round(value * 100) / 100;
                            } else if (datasetIndex === 1) {
                                // This is the "Longest Round" dataset
                                return 'Longest Round: ' + Math.round(value * 100) / 100;
                            }
                        },
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: O2maxYValue,
                            stepSize: 10,
                            font: {
        
                                size: 10 // Change to your desired font size
                            },
                            fontColor: '#0661AA' // Change to your desired font color
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            font: {
        
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
    }
    O2Container.addEventListener('touchmove', function (event) {
        event.preventDefault(); // Prevent default scrolling behavior

        if (O2touchStartX !== null) {
            var O2touchMoveX = event.touches[0].clientX;

            if (O2lastScrollX !== null) {
                var O2delta = O2touchMoveX - O2lastScrollX;

                if (Math.abs(O2delta) >= O2scrollThreshold) {
                    O2lastScrollX = O2touchMoveX;

                    if (O2delta > 0) {
                        // Scroll right, decrease the date range
                        O2endDate.setDate(O2endDate.getDate() - 1);
                        O2startDate.setDate(O2startDate.getDate() - 1);
                        if (isPortuguese) {
                            O2chart.options.title.text = "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(O2endDate) + ")";
                        } else {
                            O2chart.options.title.text = "Your O2 Table Training results " + "(" + getYear(O2endDate) + ")";
                        }
                    } else if (O2delta < 0) {
                        if (formatDateAsDMY(O2endDate) == formatDateAsDMY(O2today)) {
                            // Do nothing if already at the current date
                        } else {
                            // Scroll left, increase the date range
                            O2endDate.setDate(O2endDate.getDate() + 1);
                            O2startDate.setDate(O2startDate.getDate() + 1);
                            if (isPortuguese) {
                                O2chart.options.title.text = "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(O2endDate) + ")";
                            } else {
                                O2chart.options.title.text = "Your O2 Table Training results " + "(" + getYear(O2endDate) + ")";
                            }
                        }
                    }
                    O2updateChart(O2startDate, O2endDate);
                }
            } else {
                O2lastScrollX = O2touchMoveX;
            }
        }
    });

    O2Container.addEventListener('touchend', function () {
        O2lastScrollX = null;
    });
    O2Container.addEventListener('wheel', function (event) {
        // Determine the direction and magnitude of the horizontal scroll
        var O2delta = event.deltaX * 0.1;

        if (O2delta < 0) {
            // Scroll left, decrease the date range
            O2endDate.setDate(O2endDate.getDate() - 1);
            O2startDate.setDate(O2startDate.getDate() - 1);
            if (isPortuguese) {
                O2chart.options.title.text = "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(O2endDate) + ")";
            } else {
                O2chart.options.title.text = "Your O2 Table Training results " + "(" + getYear(O2endDate) + ")";
            }
        } else if (O2delta > 0) {
            if (formatDateAsDMY(O2endDate) == formatDateAsDMY(O2today)) { }
            else {
                // Scroll right, increase the date range
                O2endDate.setDate(O2endDate.getDate() + 1);
                O2startDate.setDate(O2startDate.getDate() + 1);
                if (isPortuguese) {
                    O2chart.options.title.text = "Seus resultados de Treinamento da Tabela CO2 " + "(" + getYear(O2endDate) + ")";
                } else {
                    O2chart.options.title.text = "Your O2 Table Training results " + "(" + getYear(O2endDate) + ")";
                }
            }
        }
        O2updateChart(O2startDate, O2endDate);
    });
    O2updateOverview();
    // Add a click event listener to the chart
    // Function to handle bar click event
    function O2handleBarClick(event, array) {
        var O2index = array[0]._index; // Get the clicked bar index
        var O2selectedDate = O2selectedDataDatesYear[O2index];
        O2displayDetailedInfo(O2selectedDate);
    }
    O2chart.options.onClick = function (event, array) {
        if (array.length > 0) {
            O2handleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        O2chart.options.onClick = function (event, array) {
            if (array.length > 0) {
                O2handleBarClick(event, array);
            }
        };
    }
}

function O2findMaxResult() {
    var O2maxResult = 0;

    fetchedDataArray.forEach(O2resultData => {
        var O2timeString = O2resultData.o2TotalTime;

        // Check if the timeString is not empty before parsing
        if (O2timeString !== undefined && O2timeString !== '' && O2timeString !== null) {
            var highestResult = O2getHeightestNumber(O2timeString);
            O2maxResult = Math.max(O2maxResult, highestResult);
        }
    });
    return O2maxResult;
}
function O2findMaxAverage() {
    var O2maxResult = 0;

    fetchedDataArray.forEach(O2resultData => {
        var O2timeString = O2resultData.o2TotalTime;
        var O2dateString = O2resultData.o2ResultDate;
        var O2rounds = O2resultData.o2Intervals;
        // Check if the timeString is not empty before parsing
        if (O2timeString !== undefined && O2timeString !== '' && O2timeString !== null) {
            var highestResult = O2getAverage(O2timeString);
            O2maxResult = Math.max(O2maxResult, highestResult);
            O2longestAverageDate = O2dateString;
            O2LongestAverageIntervals = O2rounds;
        }
    });
    return O2maxResult;
}
function O2updateChartData(O2startDate, O2endDate) {
    var O2dateRange = []; // New array to hold the date range between startDate and endDate

    // Populate the date range array
    var O2currentDate = new Date(O2startDate);
    while (O2currentDate <= O2endDate) {
        O2dateRange.push(new Date(O2currentDate));
        O2currentDate.setDate(O2currentDate.getDate() + 1); // Move to the next day
    }

    var O2aggregatedData = {}; // Use an object to aggregate data by date
    var O2aggregatedData2 = {}; // Use an object to aggregate data by date
    var numberOfRows = 0;
    fetchedDataArray.forEach(O2resultData => {
        var O2resultDate = new Date(O2resultData.o2ResultDate);
        var O2seconds;
        var O2longest;
        numberOfRows++;
        var O2timeString = O2resultData.o2TotalTime;
        if (O2timeString !== undefined && O2timeString !== '' && O2timeString !== null) {
            O2seconds = O2getAverage(O2timeString);
            O2longest = O2getHeightestNumber(O2timeString);
        } else {
            O2minutes = 0;
        }
        if (!isNaN(O2resultDate.getTime())) {
            var O2formattedDate = formatDateAsDMY(O2resultDate);

            if (!O2aggregatedData[O2formattedDate]) {
                // If the date doesn't exist in the aggregated data, create a new entry
                O2aggregatedData[O2formattedDate] = { O2totalValue: parseFloat(O2seconds) };
                O2aggregatedData2[O2formattedDate] = { O2totalValue2: parseFloat(O2longest) };

            } else {
                // If the date already exists, update the existing entry
                O2aggregatedData[O2formattedDate].O2totalValue += parseFloat(O2seconds);
                O2aggregatedData[O2formattedDate].O2totalValue = O2aggregatedData[O2formattedDate].O2totalValue / numberOfRows;
                if (O2aggregatedData2[O2formattedDate].O2totalValue2 < parseFloat(O2longest)) {
                    O2aggregatedData2[O2formattedDate].O2totalValue2 = parseFloat(O2longest);
                }
            }
        }
    });

    var O2maxResult = O2findMaxResult();
    var O2chartData = O2dateRange.map(O2resultDate => {
        var O2formattedDate = formatDateAsDMY(O2resultDate);
        var O2aggregatedDatum = O2aggregatedData[O2formattedDate];
        return O2aggregatedDatum ? O2aggregatedDatum.O2totalValue : 0;
    });
    var longestRoundData = O2dateRange.map(O2resultDate => {
        var O2formattedDate2 = formatDateAsDMY(O2resultDate);
        var O2aggregatedDatum2 = O2aggregatedData2[O2formattedDate2];
        return O2aggregatedDatum2 ? O2aggregatedDatum2.O2totalValue2 : 0;
    });

    return {
        O2chartData: O2chartData,
        O2maxYValue: Math.floor(O2maxResult + 10),
        O2selectedDataDatesYear: O2dateRange.map(formatDateAsDMY),
        longestRoundData: longestRoundData
    };
}
function O2updateChart(O2startDate, O2endDate) {
    var { O2chartData, O2maxYValue, O2selectedDataDatesYear, longestRoundData } = O2updateChartData(O2startDate, O2endDate);

    // Update x-axis labels and chart data
    var O2selectedDataDatesMonthDay = O2selectedDataDatesYear.map(dateString => dateString.split('/')[0] + '/' + dateString.split('/')[1]);

    O2chart.data.labels = O2selectedDataDatesMonthDay;
    O2chart.data.datasets[0].data = O2chartData;
    O2chart.data.datasets[1].data = longestRoundData;
    O2chart.options.scales.yAxes[0].ticks.max = O2maxYValue;
    function O2handleBarClick(event, array) {
        var O2index = array[0]._index; // Get the clicked bar index
        var O2selectedDate = O2selectedDataDatesYear[O2index];
        O2displayDetailedInfo(O2selectedDate);
    }
    O2chart.options.onClick = function (event, array) {
        if (array.length > 0) {
            O2handleBarClick(event, array);
        }
    };
    // For touch-enabled devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        O2chart.options.onClick = function (event, array) {
            if (array.length > 0) {
                O2handleBarClick(event, array);
            }
        };
    }
    O2chart.update();
}
var O2numberOfTests;
function O2updateOverview() {
    O2numberOfTests = 0;
    var O2max = O2findMaxResult();
    var O2maxAverage = O2findMaxAverage();
    var O2infoOverviewElements = document.getElementsByClassName('O2infoOverview');
    fetchedDataArray.forEach(O2resultData => {
        var O2timeString = O2resultData.o2TotalTime;
        var O2dateString = O2resultData.o2ResultDate;
        // Check if the timeString is not empty before parsing
        if (O2timeString !== undefined && O2timeString !== '' && O2timeString !== null) {
            var highestResult = O2getHeightestNumber(O2timeString);
            if (highestResult === O2max) {
                O2dateOfLongestResult = O2dateString;
            }
            O2numberOfTests++;
        }
    });
    if (O2numberOfTests !== 0) {
        O2infoOverview.innerHTML = '';
        for (var i = 0; i < O2infoOverviewElements.length; i++) {
            O2infoOverviewElements[i].style.display = 'grid';
        }
        document.getElementById('O2Container').style.display = 'block';
        if (isPortuguese) {
            document.getElementById('O2numberOfSessions').value = O2numberOfTests + ' Sess\u00F5es';
            document.getElementById('O2longestRound').value = O2max + ' segundos no dia ' + formatDateAsDMY(O2dateOfLongestResult);
            document.getElementById('O2longestSession').value = O2maxAverage + ' segundos em ' + O2LongestAverageIntervals + ' rounds no dia ' + formatDateAsDMY(O2longestAverageDate);
        } else {
            document.getElementById('O2numberOfSessions').value = O2numberOfTests + ' Sessions';
            document.getElementById('O2longestRound').value = O2max + ' seconds on ' + formatDateAsDMY(O2dateOfLongestResult);
            document.getElementById('O2longestSession').value = O2maxAverage + ' seconds in ' + O2LongestAverageIntervals + ' rounds on ' + formatDateAsDMY(O2longestAverageDate);
        }
        document.getElementById('O2accordion').style.display = 'block';
    } else {
        document.getElementById('O2accordion').style.display = 'none';
        if (isPortuguese) {
            O2infoOverview.innerHTML = 'Ainda n\u00E3o h\u00E1 resultados';
        } else {
            O2infoOverview.innerHTML = 'No results yet';
        }
        for (var i = 0; i < O2infoOverviewElements.length; i++) {
            O2infoOverviewElements[i].style.display = 'none';
        }
        document.getElementById('O2Container').style.display = 'none';
    }
}
var O2resultPage = document.getElementById('O2resultPage'),
    O2resultDateHeader = document.getElementById('O2resultDateHeader'),
    O2resultSessions = document.getElementById('O2resultSessions');

function O2displayDetailedInfo(O2selectedDate) {
    function O2deleteResult(resultId) {
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
                    // Remove the deleted form
                    $('.O2delete-form [name="resultId"][value="' + resultId + '"]').closest('.O2delete-form').remove();
                    $.ajax({
                        url: "/?fetchData=true",
                        type: 'GET',
                        success: function (data) {
                            fetchedDataArray = data;
                            O2updateChart(O2startDate, O2endDate);
                            O2updateOverview();
                            openPage(O2resultPage, resultsPage, 'slideRight');
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            backO2results.style.display = "none";
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
    var O2numberOfResults = 1;
    O2resultSessions.innerHTML = ''; // Clear the existing content
    fetchedDataArray.forEach(O2resultData => {
        var O2timeString = O2resultData.o2TotalTime;
        var O2dateString = O2resultData.o2ResultDate;
        var O2resultId = O2resultData.resultId;
        // Check if the timeString is not empty before parsing
        if (O2timeString !== undefined && O2timeString !== '' && O2timeString !== null) {
            var O2seconds = O2getAverage(O2timeString);
            const parts = O2timeString.split("|").filter(str => str !== "");
            if (O2selectedDate === formatDateAsDMY(O2dateString)) {
                if (isPortuguese) {
                    O2resultDateHeader.innerHTML = 'Resultados do dia ' + O2selectedDate;
                    O2resultSessions.innerHTML += '<div>Sess\u00E3o ' + O2numberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        O2resultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' segundos" readonly class="O2resultInput"/>';
                    }
                    O2resultSessions.innerHTML += '<input value="M\u00E9dia: ' + O2seconds + ' segundos" readonly class="O2resultInput"/>';
                    O2resultSessions.innerHTML += '<form method="post" class="O2delete-form">' +
                        '<input name="resultId" value="' + O2resultId + '" style="display:none"/>' +
                        '<input type="button" value="Deletar" class="btn btn-danger O2delete-button" />' +
                        '</form>';
                } else {
                    O2resultDateHeader.innerHTML = 'Results on ' + O2selectedDate;
                    O2resultSessions.innerHTML += '<div>Session ' + O2numberOfResults + '</div>';
                    for (let i = 0; i < parts.length; i++) {
                        O2resultSessions.innerHTML += '<input value="Round ' + (i + 1) + ': ' + parts[i] + ' seconds" readonly class="O2resultInput"/>';
                    }
                    O2resultSessions.innerHTML += '<input value="Average: ' + O2seconds + ' seconds" readonly class="O2resultInput"/>';
                    O2resultSessions.innerHTML += '<form method="post" class="O2delete-form">' +
                        '<input name="resultId" value="' + O2resultId + '" style="display:none"/>' +
                        '<input type="button" value="Delete" class="btn btn-danger O2delete-button" />' +
                        '</form>';
                }
                O2numberOfResults++;
            }
        }
    });

    // Add event listeners for delete buttons
    var O2deleteButtons = document.querySelectorAll('.O2delete-button');
    O2deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            var O2form = this.closest('.O2delete-form');
            var O2resultId = O2form.querySelector('[name="resultId"]').value;
            O2deleteResult(O2resultId);
        });
    });

    openPage(resultsPage, O2resultPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backO2results.style.display = "block";
    closeModalResults();
}
// END O2