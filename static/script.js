'use strict'

// CONSTANTS
var BROWSER_FIREFOX = 0;
var BROWSER_IE = 1;
var BROWSER_WEBKIT = 2;
var BROWSER_TYPE = /webkit/i.test(navigator.userAgent) ? BROWSER_WEBKIT : (/trident/i.test(navigator.userAgent) ? BROWSER_IE : BROWSER_FIREFOX);
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var editState = false;

// DOM VARS
var app = $(this);

//Text
var appTitle             = $('.app-title');
var filtersText          = $('.filters-text');
var newExpButtonText     = $('.new-exp-button span');
var editExpButtonText    = $('.edit-exp-button span');
var infoTabText          = $('.ui-tab-element.info-tab span');
var docTabText           = $('.ui-tab-element.doc-tab span');
var timelineTabText      = $('.ui-tab-element.timeline-tab span');
var budgetTabText        = $('.ui-tab-element.budget-tab span');
var sidebar              = $('.exp-list');
var sidebarExpPrototype  = $('.exp.wz-prototype', sidebar);
var expStatusTitle       = $('.exp-status .title');
var expDescTitle         = $('.exp-desc .title');
var expClientTitle       = $('.exp-client .title');
var expAsignsTitle       = $('.exp-asigns .title');
var expPeopleTitle       = $('.exp-people .title');
var more                 = $('.more');
var titleText            = $('.edit-mode .title, .exp-status .title');
var internText           = $('.intern');
var externText           = $('.extern');
var saveText             = $('.save-exp-button span');
var cancelText           = $('.cancel-exp-button span');
var deleteText           = $('.delete-exp-button span');
var timelineTitleText    = $('.timeline-title');
var openExpText          = $('.ui-select-dropdown .open span');
var closedExpText        = $('.ui-select-dropdown .closed span');
var noFolderText         = $('.no-folder');
var newLinkFolderText    = $('.new-link-folder span');
var linkFolderText       = $('.link-folder span');
var eventDocText         = $('.event-select-dropdown .event-doc span');
var eventMetText         = $('.event-select-dropdown .event-met span');
var eventWorText         = $('.event-select-dropdown .event-wor span');
var eventOthText         = $('.event-select-dropdown .event-oth span');
var newEventText         = $('.new-event-text');
var budgetText           = $('.budget-text');
var budgetPaywayText     = $('.pay-way-text');
var paymentsText         = $('.payments-text');
var paymentsValueText     = $('.payments-value');

//Events
var editExpButton        = $('.edit-exp-button');
var saveExpButton        = $('.save-exp-button');
var cancelExpButton      = $('.cancel-exp-button');
var deleteExpButton      = $('.delete-exp-button');
var expStatusButton      = $('.exp-status .ui-select-dropdown article');
var tabs                 = $('.ui-window-content .ui-tab .ui-tab-element');
var newEventSelect       = $('.top-timeline .select');

//Others
var editPopup            = $('.edit-mode-popup');
var uiWindowContent      = $('.ui-window-content');
var expStatusIcon        = $('.exp-status .ui-select-input > i');
var expDescription       = $('.exp-desc .look-mode');
var expDescriptionInput  = $('.exp-desc .edit-mode');
var tabSections          = $('.tab-section');
var eventTypeSelect      = $('.event-select-dropdown');

// COLOR PALETTE
var colorPalette = [
  {name: 'blue' , light: '#a6d2fa', text:'#2a77ad' , border:'#1664a5'},
  {name: 'green' , light: '#badb95', text:'#306e0d' , border:'#3c7919'},
  {name: 'purple' , light: '#d8ccf1', text:'#9064e1' , border:'#6742aa'},
  {name: 'orange' , light: '#f7c97e', text:'#b45d1f' , border:'#f68738'},
  {name: 'brown' , light: '#b2a59d', text:'#5a4638' , border:'#6e5646'},
  {name: 'green2' , light: '#8cd0b3', text:'#0a5a36' , border:'#128a54'},
  {name: 'red' , light: '#ec9a97', text:'#912521' , border:'#e13d35'},
  {name: 'pink' , light: '#f7beec', text:'#9c4ba5' , border:'#b44b9f'},
  {name: 'grey' , light: '#97a1a9', text:'#353b43' , border:'#384a59'},
  {name: 'yellow' , light: '#fbe27d', text:'#84740b' , border:'#ffb400'},
];


// MONTH NAMES
var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// EVENTS
editExpButton.on('click', function(){
  editState ? editMode(false) : editMode(true);
});

cancelExpButton.on('click', function(){
  editMode(false);
});

expStatusButton.on('click', function(){
  $(this).hasClass('open') ? expStatusIcon.removeClass('closed')  :  expStatusIcon.addClass('closed');
});

tabs.on('click', function(){
  changeTab($(this));
});

newEventSelect.on('click', function(){
  $(this).addClass('opened');
  selectNewEvent($(this));
});

app.on('click', function(e){
  hideDropdowns(e);
});

// OBJECTS
var Record = function( params ){};
var Action = function( params ){};

// APP functionality
var initLegal = function(){

  setInitialTexts();

  getRecords( function( error, list ){

    console.log('getRecords',error,list)

    if( error ){ return; }

    for( var i = 0; i < list.length; i++ ){
      appendRecord( list[ i ] );
    }

  });

}

var appendRecord = function( record ){

  console.log( record );
  var newRecord = sidebarExpPrototype.clone().removeClass('wz-prototype');

  $( '.name-exp', newRecord ).text( record.name );
  $( '.id-exp', newRecord ).text( record.id_internal + ' - ' + 'NOT IMPLEMENTED' );

  sidebar.append( newRecord );

};

var getRecords = function( callback ){

  wz.project.getCategories( function( error, list ){

    console.log('categories',list)

    if( error ){ return callback( error ); }

    var found = false;

    for( var i = 0; i < list.length; i++ ){

      if( list[ i ].name === 'inevioLegalApp' ){
        found = list[ i ];
        break;
      }

    }

    if( !found ){ return callback( null, [] ); }

    found.getProjects( function( error, list ){

      console.log('projects',list)

      if( error ){ return callback( error ); }
      callback( null, list );

    });

  });

};

var setInitialTexts = function(){
  appTitle.text(lang.legal);
  filtersText.text(lang.filters);
  newExpButtonText.text(lang.newExp);
  editExpButtonText.text(lang.editExp);
  infoTabText.text(lang.info);
  docTabText.text(lang.doc);
  timelineTabText.text(lang.timeline);
  budgetTabText.text(lang.budget);
  expStatusTitle.text(lang.expStatus);
  expDescTitle.text(lang.expDesc);
  expClientTitle.text(lang.client);
  expAsignsTitle.text(lang.asigns);
  expPeopleTitle.text(lang.people);
  more.text(lang.more);
  titleText.text(lang.title);
  internText.text(lang.internId);
  externText.text(lang.externId);
  saveText.text(lang.save);
  cancelText.text(lang.cancel);
  deleteText.text(lang.delete);
  timelineTitleText.text(lang.timeline);
  openExpText.text(lang.open);
  closedExpText.text(lang.closed);
  noFolderText.text(lang.noFolder);
  newLinkFolderText.text(lang.newFolder);
  linkFolderText.text(lang.selectFolder);
  eventDocText.text(lang.documents);
  eventMetText.text(lang.meeting);
  eventWorText.text(lang.work);
  eventOthText.text(lang.others);
  newEventText.text(lang.newEvent);
  budgetText.text(lang.budget);
  budgetPaywayText.text(lang.payway);
  paymentsText.text(lang.payments);
  paymentsValueText.text(lang.value);
}

var editMode = function(mode){
  if(mode){
    $('.look-mode').hide();
    $('.edit-mode').show();
    $('.event').addClass('edit');
    $('.budget-tab-section').addClass('edit');
    recoverInputsInfo();
    drawPopup();
  }else{
    $('.edit-mode').hide();
    $('.look-mode').show();
    $('.event').removeClass('edit');
    $('.budget-tab-section').removeClass('edit');
    undrawPopup();
  }
}

var drawPopup = function(){
  editPopup.addClass('active');
  uiWindowContent.addClass('edit');
}

var undrawPopup = function(){
  editPopup.removeClass('active');
  uiWindowContent.removeClass('edit');
}

var changeTab = function(object){
  var index = object.index();
  tabs.removeClass('active');
  object.addClass('active');
  tabSections.hide();
  tabSections.eq(index).show();
}

var selectNewEvent = function(){
  eventTypeSelect.show();
}

var recoverInputsInfo = function(){
  expDescriptionInput.val(expDescription.text());
  var events = $('.event');
  for (var i = 0; i < events.length; i++) {
    var date = events.eq(i).find('.event-time').text().split(' ');
    var month = monthNames.indexOf( date[1] ) +1;
    var hour = date[3];
    var date = date[0]+'/'+month+'/'+date[2];
    var eventI = events.eq(i);
    eventI.find('.event-time-input > input').val(date);
    eventI.find('.event-time-select .ui-select-input .ellipsis').text(hour);
    eventI.find('.event-desc-title input').val(eventI.find('.event-desc-title span').text())
    eventI.find('.event-desc-info-input').val(eventI.find('.event-desc-info').text())
    eventI.find('.event-min input').val(eventI.find('.event-min span').text());
    eventI.find('.event-price.income input').val(eventI.find('.event-price.income span').text());
    eventI.find('.event-price.expenses input').val(eventI.find('.event-price.expenses span').text());
  }
}

var hideDropdowns = function(e){
  var target = $(e.target);
  if(newEventSelect.hasClass('opened') && !target.hasClass('item') && newEventSelect.hasClass('prepared')){
    $('.dropdown').hide();
    newEventSelect.removeClass('prepared');
    newEventSelect.removeClass('opened');
  }
  if(newEventSelect.hasClass('opened')){
    newEventSelect.addClass('prepared');
  }
}

// Program run
initLegal();
