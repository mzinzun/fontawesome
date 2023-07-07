window.onload = function(){

// fa-documents Page
const faDocument = document.getElementById('fa-document');
const docsList = document.getElementById('docs-aside');
docsList.addEventListener('click', (e)=>{
	const pdfTitle = '../media/'+e.target.attributes.pdfSource.value+'.pdf';
	faDocument.setAttribute('src',pdfTitle);
});
};