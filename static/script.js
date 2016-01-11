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

//Events
var editExpButton        = $('.edit-exp-button');
var saveExpButton        = $('.save-exp-button');
var cancelExpButton      = $('.cancel-exp-button');
var deleteExpButton      = $('.delete-exp-button');
var expStatusButton      = $('.exp-status .ui-select-dropdown article');

//Others
var editPopup            = $('.edit-mode-popup');
var uiWindowContent      = $('.ui-window-content');
var expStatusIcon        = $('.exp-status .ui-select-input > i');
var expDescription       = $('.exp-desc .look-mode');
var expDescriptionInput  = $('.exp-desc .edit-mode');

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
}

var editMode = function(mode){
  if(mode){
    $('.look-mode').hide();
    $('.edit-mode').show();
    expDescriptionInput.val(expDescription.text());
    drawPopup();
  }else{
    $('.edit-mode').hide();
    $('.look-mode').show();
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

// Program run
initLegal();
