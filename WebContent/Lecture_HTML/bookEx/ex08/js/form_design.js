$(document).ready(init);

function init() {
	hideLabel();
	addRequiredStar();
}

function hideLabel() {
	$('label', '#reg').not('[for=accept_terms]').addClass('blind');
};

function addRequiredStar() {
	var target = $('[required]', '#reg');

	$('<span/', {
		text : '*',
		css : {
			'color' : '#ff4248',
			'font' : 'bold 12px Verdana',
			'vertical-align' : 'middle',
			'margin-left' : '5px'
		}
	}).insertAfter(target);
};