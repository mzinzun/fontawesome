window.onload = function() {
	
// define global variables
const data = (start.split('.')).map(item => item.slice(0,item.indexOf(':')));
console.log(data);
var iconToPreview ='';
var searchList;
// =================== Function Declarations ===================

// function to set 'active' selected icon
function setActive (el) {
    const divTarget = '#div' + el.innerText;
    $('div').removeClass('active');
    $(divTarget).addClass('active');
    // show selected Icon in preview window
    viewIcon(el.innerText);
}
// function to set 'focus' for icon selected from search list
function setIconFocus (e) {
    // last_IconList_option_elected = e.target.value;
    const value = '#div'+e.target.value;
    // move page to display icon selected from icons search list in icon library
    window.location.href=value;
    // $("#iconSelect").attr('href', value);
    setActive(e.target);
}
// function to place icon to view in Previw window
function viewIcon (icon){
    $('#showIcon').html(`
        <div class='iconPreviewing'>
            <i id ='fas' class= "fas ${icon}"></i>
            <i id ='fab' class= "fab ${icon}"></i>
        </div>
        <p id ='showIconClass'>${icon}</p>
        `);
      iconToPreview=icon;
    $('#showOptions').fadeIn();
}
// function to manage auto-fill for search list
function setAutoFill (elem) {
    $('#iconSearch').attr('value','e');
    const val = elem.tagName === 'INPUT'?elem.value:elem.innerText.slice(3,6);
    $('#iconSearch').attr('value',val);
    const subData = data.filter(el=> el.match(`fa-${val}`));
    $('#iconList').html('<option value="Choose 1" style="background-color: lightgray" disabled>Choose an Icon:</option>');
    subData.forEach (icon => {$('#iconList').append(`<option id=${icon} value=${icon}>${icon}</option>`)});
}
// function to add selected option to icon setting in preview window
function addIconOption (e, iconPreviewSection){
    let el = e.target;
    let textClass = iconPreviewSection;
    $('#fas').removeClass();
    $('#fab').removeClass();
    $('#fas').addClass('fas');
    $('#fab').addClass('fab');
    $('#fas').addClass(iconPreviewSection);
    $('#fab').addClass(iconPreviewSection);
    switch(el.attributes.value.value){
        case ('rotate-90'):
            $('#fas').addClass('fa-rotate-90');
            $('#fab').addClass('fa-rotate-90');
            $('#showIconClass').text('');
            $('#showIconClass').text(textClass+' fa-rotate-90');
            break;
        case ('rotate-180'):
            $('#fas').addClass('fa-rotate-180');
            $('#fab').addClass('fa-rotate-180');
            $('#showIconClass').text('');
            $('#showIconClass').text(textClass+' fa-rotate-180');
            break;
        case ('spin'):
            $('#fas').addClass('fa-spin');
            $('#fab').addClass('fa-spin');
            $('#showIconClass').text('');
            $('#showIconClass').text(textClass+' fa-spin');
            break;
        case('resize'):
            $('#fas').addClass('fa-pulse');
            $('#fab').addClass('fa-pulse');
            $('#showIconClass').text('');
            $('#showIconClass').text(textClass+' fa-pulse');
            break;
        default:
            break;
    }
}

// =================== Event Listeners ===================

$('#iconList').on('click', e=> setIconFocus(e));
$("#iconSearch").on('keyup', e=> setAutoFill(e.target));
$('#iconDivs').on('click', (e)=>{
    // determine which element selected and point to it's 'icon-label element
    (e.target.tagName === 'DIV') ? setActive(e.target.children[1]):
        (e.target.tagName === 'SPAN') ? setActive(e.target.parentNode.nextElementSibling):
            ((e.target).classList.contains('iconSpec')) ? setActive(e.target.nextElementSibling):
                setActive(e.target);
    (e.target.tagName === 'DIV') ? setAutoFill(e.target.children[1]):
        (e.target.tagName === 'SPAN') ? setAutoFill(e.target.parentNode.nextElementSibling):
            ((e.target).classList.contains('iconSpec')) ? setAutoFill(e.target.nextElementSibling):
                setAutoFill(e.target);
});
$('#iconOptions').on('click', e => addIconOption(e,iconToPreview));
// $('#iconList').on('active', e => e.target.focus() );


// =================== startUp executions ===================

// Create and add Iconlist option elements for icon search list
$('#iconList').html('');
data.forEach (icon => {(icon !== '')&&$('#iconList').append(`<option id=${icon} value=${icon}>${icon}</option>`)});
// Create and add IconDivs div elements to display icon library
data.forEach ( item => (item === '')||$('#iconDivs').append(`
    <div id = "div${item}">
        <p class='iconSpec' ><i class='fas ${item}'></i><i class='fab ${item}' ></i></p>
        <p class='icon-label'>${item}</p>
    </div>`
));
setTimeout(()=> $('#iconSearch').focus(), 1000);

}; // end of onload
