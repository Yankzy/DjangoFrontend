

const globalVar = {planId:0, freq:"Monthly"}; // Globally scoped object


// changes price on toggle
function check() {
var annualy = document.getElementById("annualy-1");
price1 = document.getElementById("price1");
price2 = document.getElementById("price2");
price3 = document.getElementById("price3");
// freq = document.getElementById('frequency');
var freq = document.querySelectorAll('[id="frequency"]');

for(var i = 0; i < freq.length; i++) {
    if (annualy.checked == true) {
        freq[i].innerHTML = "Annually";
        globalVar.freq = "Annually";
    }else if (annualy.checked == false) {
        freq[i].innerHTML = "Monthly";
        globalVar.freq = "Monthly";
    }
    
}

if (annualy.checked == true) {
    price1.innerHTML = '176';
    price2.innerHTML = '1,839';
    price3.innerHTML = '4,611';
} else if (annualy.checked == false) {
    price1.innerHTML = '19';
    price2.innerHTML = '199';
    price3.innerHTML = '499';
}
}

function changeVal(plan) {
    // document.getElementById("p-id").innerHTML = plan + " Plan";
    if (globalVar.freq == "Annually" && plan == "PAYROLL") {
        var  planId = '179';
        var  valz = document.getElementById("price1").innerHTML;
        
    }else if (globalVar.freq == "Annually" && plan == "BOOKKEEPING") {
        var  planId = '1,839';
        var  valz = document.getElementById("price2").innerHTML;

    }else if (globalVar.freq == "Annually" && plan == "ADMINISTRATIVE") {
        var  planId = '4,611';
        var  valz = document.getElementById("price3").innerHTML;

    }else if (globalVar.freq == "Monthly" && plan == "PAYROLL") {
        var  planId = '19';
        var  valz = document.getElementById("price1").innerHTML;

    }else if (globalVar.freq == "Monthly" && plan == "BOOKKEEPING") {
        var  planId = '199';
        var  valz = document.getElementById("price2").innerHTML;

    }else if (globalVar.freq == "Monthly" && plan == "ADMINISTRATIVE") {
        var  planId = '499';
        var  valz = document.getElementById("price3").innerHTML;
    };
    

    document.getElementById("pvalue").innerHTML = valz;

    globalVar.planName = plan;
    globalVar.planId = planId;
    globalVar.valz = valz
}

// CSRF protection
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// Function tosend data to the success view
function orderCompleted() {

    // Passing data to process subscription locally
    var url = "{% url 'paypal_received' %}";
    fetch(/received/, {
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
            'X-Requested-With': 'XMLHttpRequest',
        },
        body:JSON.stringify({"planName":globalVar.planName, "freq":globalVar.freq,}),
        credentials: 'same-origin'
    });


    // $.ajax({
    //     type: "POST",
    //     url: "~/utility.py",
    //     data: { param: input },
    // // window.location.href = "{% url 'success' %}"
    // }).done(function(o) {
    //     console.log(data);
    //     console.log('It works!');
    // });

        
    
}




// Render the PayPal SANDBOX button 
paypal.Buttons({

    // Set up the transaction
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '55'
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            // alert('Transaction completed by ' + details.payer.name.given_name + '!');
            orderCompleted()
        });
    }


}).render('#paypal-button-container');



// // Render the PayPal button LIVE ACCOUNT
// paypal.Buttons({
//     style: {
//             color:  'gold',
//             shape:  'pill',
//             layout: 'vertical',
//             label: 'subscribe',
//             height: 50
//         },
//     createSubscription: function(data, actions) {

//         return actions.subscription.create({
            
//             // 'plan_id': 'P-43N57950X58612443L7BTXIY'  // For testing uncomment this
//             'plan_id': globalVar.planId  //Comment this out for testing
//         });
//     },
//     onApprove: function(data, actions) {
//         alert(data.subscriptionID);
//         // var url = "{% url 'success' %}";
//         // $.ajax({
//         //     type: "POST",
//         //     url: "~/utility.py",
//         //     data: { param: input },
//         // // window.location.href = "{% url 'success' %}"
//         // }).done(function(o) {
//         //     console.log(data);
//         //     console.log('It works!');
//         // });
        
//         // completeOrder()
//         // window.location.href = "{% url 'success' %}"
//     }
// }).render('#paypal-button-container');


// Smooth scroll

class ScrollTo {
    constructor(elem) {
        this.elem = elem;
        this.target = "" !== elem.dataset.scrollTo ? elem.dataset.scrollTo : "header";
        this.init();
    }

    init() {
        this.elem.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById(this.target).scrollIntoView({ block: "start", inline: "nearest", behavior: 'smooth' });
        });
    }
    }


    [...document.querySelectorAll("[data-scroll-to]")].map(elem => elem.scoll = new ScrollTo(elem));


