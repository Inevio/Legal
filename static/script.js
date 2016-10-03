// LEGAL 1.0.1
'use strict'

// CONSTANTS
var BROWSER_FIREFOX = 0;
var BROWSER_IE = 1;
var BROWSER_WEBKIT = 2;
var BROWSER_TYPE = /webkit/i.test(navigator.userAgent) ? BROWSER_WEBKIT : (/trident/i.test(navigator.userAgent) ? BROWSER_IE : BROWSER_FIREFOX);
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// DOM VARS
var app = $(this);
var recordActive = '';
var legal = '';
var nRecords = 0;
var editStatus = false;
var recordFolder = '';
var creating = false;
var contactList;
var modifing = false;
var recordList = [];
var contactListOrder = [];

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
var paymentsValueText    = $('.payments-value');
var noBudgetText         = $('.no-budget-text');
var newBudgetButton      = $('.new-budget-button span');
var selectContactText    = $('.select-contact-text');
var welcomeFirst         = $('.welcome-first');
var welcomeSecond        = $('.welcome-second');
var welcomeButtonText    = $('.welcome-page .ellipsis');

//Events
var editExpButton        = $('.edit-exp-button');
var saveExpButton        = $('.save-exp-button');
var cancelExpButton      = $('.cancel-exp-button');
var deleteExpButton      = $('.delete-exp-button');
var expStatusButton      = $('.exp-status .ui-select-dropdown article');
var tabs                 = $('.ui-window-content .ui-tab .ui-tab-element');
var newEventSelect       = $('.top-timeline .select');
var closeSelectContact   = $('.select-contact-popup .close-popup');
var addContact           = $('.info-tab-section .add');
var newEventDoc          = $('.item.event-doc');
var newEventMet          = $('.item.event-met');
var newEventWor          = $('.item.event-wor');
var newEventOth          = $('.item.event-oth');
var newPayment           = $('.add-payment');
var linkFolder           = $('.link-folder');
var newLinkFolder        = $('.new-link-folder');
var newBudget            = $('.new-budget-button');
var openContacts         = $('.open-contacts');
var recordSearchInput    = $('.rec.search-filters input');
var recordSearchDelete   = $('.rec.search-filters .delete-content');
var contactSearchInput   = $('.cont.search-filters input');
var contactSearchDelete  = $('.cont.search-filters .delete-content');

//Others
var editPopup            = $('.edit-mode-popup');
var uiWindowContent      = $('.ui-window-content');
var expStatusIcon        = $('.exp-status .ui-select-input > i');
var expStatus            = $('.exp-status .look-mode');
var expDescription       = $('.exp-desc .look-mode');
var expDescriptionInput  = $('.exp-desc .edit-mode');
var tabSections          = $('.tab-section');
var eventTypeSelect      = $('.event-select-dropdown');
var noEntryPrototype     = $('.no-entry.wz-prototype');
var newExpButton         = $('.new-exp-button');
var welcomePage          = $('.welcome-page');
var newExpWelcome        = $('.welcome-page .ui-btn.big');

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
  editStatus ? editMode(false) : editMode(true);
});

cancelExpButton.on('click', function(){
  cancelRecord();
});

expStatusButton.on('click', function(){
  if($(this).hasClass('open')){
    expStatusIcon.removeClass('closed');
    expStatus.removeClass('closed');
  }else{
    expStatusIcon.addClass('closed');
    expStatus.addClass('closed')
  }
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

closeSelectContact.on('click', function(){
  cleanSelectContact();
});

addContact.on('click', function(){
  selectContact($(this));
});

saveExpButton.on('click', function(){
  saveRecord();
});

newExpButton.on('click', function(){
  createRecord();
});

newEventDoc.on('click', function(){
  addEvent('Documentos', 'event-doc');
});

newEventMet.on('click', function(){
  addEvent('Reunión', 'event-met');
});

newEventWor.on('click', function(){
  addEvent('Trabajo', 'event-wor');
});

newEventOth.on('click', function(){
  addEvent('Otros', 'event-oth');
});

newPayment.on('click', function(){
  addPayment();
});

newExpWelcome.on('click', function(){
  welcomePage.hide();
  createRecord();
});

deleteExpButton.on('click', function(){
  deleteRecord();
});

linkFolder.on('click', function(){
  linkDocFolder();
});

newLinkFolder.on('click', function(){
  linkNewDocFolder();
});

recordSearchInput.on('input', function(){
  refreshRecords($(this).val());
});

recordSearchDelete.on('click', function(){
  refreshRecords('');
});

contactSearchInput.on('input', function(){
  refreshContacts($(this).val());
});

contactSearchDelete.on('click', function(){
  refreshContacts('');
});

newBudget.on('click', function(){
  $('.budget-yes').show();
  $('.budget-no').hide();
  if (!editStatus) {
    editMode(true);
  }
});

wz.project.on('projectCreated', function(o){
  console.log('CONCURRENCIA!! Expediente creado', o);
  if (!creating) {
    appendRecord(o);
  }
  creating = false;
});

wz.project.on('projectModified', function(o){
  var found = searchRecord(o.id);
  if(found && !modifing){
    console.log('CONCURRENCIA!! Expediente modificado', o);
    found.data('record', o);
    var currentRecord = $('.exp.active').data('record');
    if (editStatus && o.id == currentRecord.id ) {
      alert('El contacto que estaba editando ha sido modificado por otro usuario');
      cancelRecord();
    }else if(o.id == currentRecord.id){
      $('.exp.active').click();
    }
  }
  modifing = false;
});


wz.project.on('projectRemoved', function(o){
  console.log('CONCURRENCIA!! Expediente borrado', o);
  var found = searchRecord(o);
  if (found) {
    var currentRecord = $('.exp.active').data('record');
    found.remove();
    if (editStatus && o == currentRecord.id ) {
      alert('El contacto que estaba editando ha sido eliminado por otro usuario');
      editMode(false);
      $('.record').eq(0).click();
    }else if(o == currentRecord.id){
      $('.record').eq(0).click();
    }
  }
});

openContacts.on('click', function(){
  wz.app.openApp(212, function(o){
    console.log('ME HA LLEGADO EL CONTACTO!', o);
    var place =  $('.select-contact-popup').data('place');
    var contact = $('.client-selectable.wz-prototype').clone();
    contact.removeClass('wz-prototype');
    contact.addClass('cleanable');
    setAvatarCon(o, contact);
    if(o.isCompany){
      contact.find('.info-client-selectable').text(o.name.first+' '+o.name.last);
      contact.find('.name-client-selectable').text(o.org.company);
      contact.find('.company-mode').show();
    }else{
      contact.find('.name-client-selectable').text(o.name.first+' '+o.name.last);
      contact.find('.info-client-selectable').text(o.org.company);
      contact.find('.company-mode').hide();
    }
    contact.addClass('contact-selectable');
    $('.client-selectable.wz-prototype').before(contact);
    contact.data('contact', o)
    contact.on('click', function(){
      asignContact($(this), place);
    });
    contact.click();
  });
});

// OBJECTS
var Record = function( params ){};
var Action = function( params ){};

// APP functionality
var initLegal = function(){

  setInitialTexts();

  wz.contacts.getAccounts(function(err, l){
    l[0].getGroups(function(e, o){
      o[0].getContacts(function(e, o){
        contactList = o;
        getRecords( function( error, list ){

          if( error ){ return; }

          console.log('EXPEDIENTES:', error, list);

          if (list.length == 0){
            welcomePage.show();
          }

          var sortList = list.sort(function(a,b){return a.name.localeCompare( b.name );});

          for( var i = 0; i < sortList.length; i++ ){
            appendRecord( sortList[ i ] );
          }
          $('.record').eq(0).click();

        });
      });
    });
  });
}

var appendRecord = function( record ){

  var newRecord = sidebarExpPrototype.clone().removeClass('wz-prototype');

  if (record.custom.client.length > 0) {
    var clientName = '';
    if(record.custom.client[0].isCompany){
      clientName = record.custom.client[0].org.company;
    }else{
      clientName = record.custom.client[0].name.first + ' ' + record.custom.client[0].name.last;
    }

    $( '.name-exp', newRecord ).text( record.idInternal + ' - ' + clientName );
  }else{
    $( '.name-exp', newRecord ).text( record.idInternal );
  }

  if ( $( '.name-exp', newRecord ).text() == '' ) {
    $( '.name-exp', newRecord ).text( 'Expediente sin cliente' );
  }

  setAvatarExp(record, newRecord);
  if (record.name != '' && record.id != '') {
    $( '.id-exp', newRecord ).text( record.id + ' - ' + record.name );
  }else if( record.name != '' ){
    $( '.id-exp', newRecord ).text( record.name );
  }else if( record.id != '' ){
    $( '.id-exp', newRecord ).text( record.id );
  }

  if(record.custom.status){
    newRecord.find('.highlight-area').addClass('closed');
  }

  nRecords++;
  newRecord.addClass('record');
  $('.exp-list').append(newRecord);
  recordList.push(newRecord);
  newRecord.data('record', record);
  newRecord.off('click');
  newRecord.on('click', function(){
    selectRecord($(this));
  })

  newRecord.data('folder', record.custom.folder);


};

var getRecords = function( callback ){
  wz.project.getCategories( function( error, list ){

    if( error ){ return callback( error ); }

    var found = false;

    for( var i = 0; i < list.length; i++ ){

      if( list[ i ].name === 'inevioLegalApp' ){
        found = list[ i ];
        break;
      }

    }

    if( !found ){
      wz.project.createCategory( {"name" : 'inevioLegalApp'} , function(e,o){
        if( error ){
          return callback( error );
        }

        wz.fs('root', function(e, root){
          root.createDirectory('Expedientes', function(e, dir){
            recordFolder = dir.id;
            legal = o;
            o.custom = {"folder" : dir.id};
            o.modify(o, function(){
              console.log('CATEGORIA CREADA', e, o);
              callback(null, []);
            });
          });
        });
      });


    }else{

      recordFolder = found.custom.folder;
      console.log('>', found);
      legal = found;

      found.getProjects( function( error, list ){

        if( error ){
          return callback( error );
        }
        callback( null, list );

      });
    }
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
  expStatusTitle.text(lang.expStatus);
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
  noBudgetText.text(lang.noBudget);
  newBudgetButton.text(lang.newBudget);
  selectContactText.text(lang.selectContact);
  welcomeFirst.text(lang.welcomeFirst);
  welcomeSecond.text(lang.welcomeSecond);
  welcomeButtonText.text(lang.addFirstRecord);
}

var createRecord = function(){
  var newRecord = sidebarExpPrototype.clone().removeClass('wz-prototype');
  $('.info-tab').click();
  $( '.name-exp', newRecord ).text( 'Expediente sin cliente' );
  $( '.id-exp', newRecord ).text( 'id Personalizable' );
  $('.exp.active.active').removeClass('active');
  newRecord.addClass('active');
  newRecord.addClass('record');
  newRecord.off('click');
  newRecord.on('click', function(){
    selectRecord($(this));
  })
  nRecords++;

  sidebar.append( newRecord );
  editMode(true);
  cleanInputs();
}

var editMode = function(mode){
  var expApi = $('.exp.active').data('record');
  if(mode){
    editStatus = true;
    $('.look-mode').hide();
    $('.edit-mode').show();
    $('.event').addClass('edit');
    $('.budget-tab-section').addClass('edit');
    recoverInputsInfo();
    drawPopup();
    desyncFolder(expApi);
    $('.event-min, .event-price').show();
    $('.name-input').focus();
  }else{
    editStatus = false;
    $('.edit-mode').hide();
    $('.look-mode').show();
    $('.event').removeClass('edit');
    $('.budget-tab-section').removeClass('edit');
    if(expApi != undefined){
      $('.exp.active').click();
    }
    undrawPopup();
  }
}

var desyncFolder = function(expApi){
  if (expApi != undefined && expApi.custom.folder != "") {
    $('.open-folder').removeClass('gray');
    $('.open-folder').addClass('cancel');
    $('.open-folder span').text('Desasociar carpeta');
    $('.open-folder').off('click');
    $('.open-folder').on('click', function(){
      if(!editStatus){
        editMode(true);
      }
      $('.exp.active').data('folder', null);
      saveRecord();
    });
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
  $('.intern-id-input').text($('.intern-id').text());
  $('.extern-id-input').val($('.extern-id').text());

  var name = $('.name').text();
  if (name == "Expediente sin nombre") {
    $('.name-input').val('');
  }else{
    $('.name-input').val(name);
  }

  var desc = expDescription.text();
  if (desc == "No hay descripción del caso...") {
    expDescriptionInput.val('');
  }else{
    expDescriptionInput.val(desc);
  }


  $('.exp-status .ui-select-input article').text($('.status').text());
  if ($('.exp-status .look-mode').hasClass('closed')) {
    $('.exp-status .ui-select-input i').addClass('closed');
  }

  recoverEventsInputs();
  recoverBudgetInputs();
}

var recoverEventsInputs = function(){
  var events = $('.event');
  for (var i = 0; i < events.length; i++) {
    var date = events.eq(i).find('.event-time').text().split(' ');
    var hour = date[1];
    var date = date[0];
    var eventI = events.eq(i);
    eventI.find('.event-time-input > input').val(date);
    eventI.find('.event-time-select .ui-select-input .ellipsis').text(hour);
    eventI.find('.event-desc-title input').val(eventI.find('.event-desc-title > span').text())
    eventI.find('.event-desc-info-input').val(eventI.find('.event-desc-info').text())
    eventI.find('.event-min input').val(eventI.find('.event-min span').text());
    eventI.find('.event-price.income input').val(eventI.find('.event-price.income span').text());
    eventI.find('.event-price.expenses input').val(eventI.find('.event-price.expenses span').text());
  }
}

var recoverBudgetInputs = function(){
  $('.budget .budget-money-input').val($('.budget-money').text());
  if ($('.budget-status').hasClass('payed')) {
    $('.budget-status-input').addClass('active');
  }else{
    $('.budget-status-input').removeClass('active');
  }
  $('.budget-pay .pay-way-input').val($('.pay-way').text());
  var payments = $('.paymentDom');
  for (var i = 0; i < payments.length; i++) {
    var payment = payments.eq(i);
    payment.find('.ui-input').val(payment.find('.title').text());
    payment.find('.payment-value-input input').val(payment.find('.payment-value').text());
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

var proyectBuilder = function(){
  var exp = {
    "name"         : "",
    "idInternal"   : 0,
    "description"  : "",
    "custom"       : {
      "client"   : [],
      "asigns"   : [],
      "interest" : [],
      "folder"   : "",
      "status"   : false,
      "events"   : [],
      "budget"   : {},
      "idExt"    : 0
                    }
  };
  return exp;
}

var contactBuilder = function(){
  var contact = {
    "id"        : "",
    "title"     : "",
    "subtitle"  : "",
    "moreInfo"  : "",
    "isCompany" : false
  }
  return contact;
}

var eventBuilder = function(){
  var event = {
    "title"         : "",
    "eventName"     : "",
    "desc"          : "",
    "duration"      : "",
    "income"        : 0,
    "expenses"      : 0,
    "date"          : "",
    "time"          : ""
  };
  return event;
}

var budgetBuilder = function(){
  var budget = {
    "price"    : "",
    "status"   : false,
    "payform"  : "",
    "pays"     : []
  };
  return budget;
}

var setAvatarExp = function(expApi, expDom){

  var expNameWords = expApi.name.split(' ');
  expDom.find('.avatar-letters').text( (expNameWords[0] || ' ')[0].toUpperCase() + (expNameWords[1] || ' ')[0].toUpperCase());

  var colorId = expApi.id%colorPalette.length;
  expDom.data('color', colorId);
  expDom.find('.avatar').css('background-image', 'none');
  expDom.find('.avatar').css('background-color', colorPalette[colorId].light);
  expDom.find('.avatar').css('border-color', colorPalette[colorId].border);
  expDom.find('.avatar').css('border-style', 'solid');
  expDom.find('.avatar-letters').css('color', colorPalette[colorId].text);
}

var setAvatarCon = function(o, contact){
  if(o.isCompany){
    contact.find('.avatar-letters').text( ( o.org.company[0] || '' ).toUpperCase() + ( o.org.company[1] || '' ).toUpperCase());
  }else{
    contact.find('.avatar-letters').text( ( o.name.first[0] || '' ).toUpperCase() + ( o.name.last[0] || '' ).toUpperCase());
  }
  var colorId = selectColor(o.id || '');
  contact.data('color', colorId);
  contact.find('.avatar').css('background-image', 'none');
  contact.find('.avatar').css('background-color', colorPalette[colorId].light);
  contact.find('.avatar').css('border-color', colorPalette[colorId].border);
  contact.find('.avatar').css('border-style', 'solid');
  contact.find('.avatar-letters').css('color', colorPalette[colorId].text);
}

var selectColor = function(string){
  var id = 0;
  for (var i = 0; i < string.length; i++) {
    id += string.charCodeAt(i);
    id++;
  }
  return id = id%colorPalette.length;
}

var selectRecord = function(record){
  if (editStatus) {
    alert('Esta editando un expediente, por favor, guarde o cancele los cambios antes de cambiar de expediente.');
  }else{
    cleanWindow();
    var expApi = record.data('record');
    recordActive = expApi;
    $('.exp.active').removeClass('active');
    record.addClass('active');
    if (expApi.name != '') {
      $('.ui-window-content .name').text(expApi.name);
    }else{
      $('.ui-window-content .name').text('Expediente sin nombre');
    }
    $('.ui-window-content .intern-id').text(expApi.id);
    $('.ui-window-content .extern-id').text(expApi.idInternal);
    if(expApi.custom.status){
      expStatus.addClass('closed');
      expStatus.find('.status').text('Cerrado');
    }else{
      expStatus.removeClass('closed');
      expStatus.find('.status').text('Abierto');
    }
    var notes;
    if(expApi.description != ''){
      notes = expApi.description;
    }else{
      notes = 'No hay descripción del caso...';
    }
    notes = notes.replace(/\n/g, '<br>');
    $('.ui-window-content .desc').html(notes);
    setClient(expApi);
    setAsigns(expApi);
    setInterest(expApi);
    setFolderSync(expApi);
    setEvents(expApi);
    setBudget(expApi);
  }
}

var setClient = function(expApi){
  var client = expApi == null ? '' : expApi.custom.client;
  if(expApi == null || client.length == 0){
    setEmptyContact($('.exp-client .add'));
  }else{
    for (var i = 0; i < client.length; i++) {
      composeContact(client[i], $('.exp-client .add'));
    }
  }
}

var setAsigns = function(expApi){
  var asigns = expApi == null ? '' : expApi.custom.asigns;
  if(expApi == null || asigns.length == 0){
    setEmptyContact($('.exp-asigns .add'));
  }else{
    for (var i = 0; i < asigns.length; i++) {
      composeContact(asigns[i], $('.exp-asigns .add'));
    }
  }
}

var setInterest = function(expApi){
  var interest = expApi == null ? '' : expApi.custom.interest;
  if(expApi == null || interest.length == 0){
    setEmptyContact($('.exp-people .add'));
  }else{
    for (var i = 0; i < interest.length; i++) {
      composeContact(interest[i], $('.exp-people .add'));
    }
  }
}

var setEmptyContact = function(place){
  var noEntry = noEntryPrototype.clone();
  noEntry.removeClass('wz-prototype');
  noEntry.addClass('cleanable');
  noEntry.on('click', function(){
    if(!editStatus){
      editMode(true);
    }
    selectContact(place);
  });
  place.before(noEntry);
}

var setFolderSync = function(expApi){
  var folder = expApi.custom.folder;

  if(folder != ""){
      $('.async').hide();
      $('.sync').show();

      wz.fs(folder, function(e, o){
        if(e){
          $('.async').show();
          $('.sync').hide();
        }else{
          $('.sync .open-folder-text').html('Carpeta "<i>'+o.name+'</i>" asociada');
          $('.sync .open-folder').off('click');
          $('.sync .open-folder').removeClass('cancel');
          $('.sync .open-folder').addClass('gray');
          $('.sync .open-folder span').text('Abrir carpeta');
          $('.sync .open-folder').on('click', function(){
            wz.fs( folder, function(e,o){
              if(e){
                $('.async').show();
                $('.sync').hide();
              }else{
                console.log('voy abrir carpeta', o);
                o.open();
              }
            });
          });
        }
      });
  }else{
    $('.async').show();
    $('.sync').hide();
  }
}

var setEvents = function(expApi){
  var eventsApi = expApi.custom.events;
  if(eventsApi.length == 0){
    $('.line').hide();
    $('.timeline-phantom').show();
    $('.timeline').hide();
  }else{
    $('.line').show();
    $('.timeline-phantom').hide();
    $('.timeline').show();
  }
  eventsApi.forEach(function(i){
    var eventDom = $('.event.wz-prototype').clone();
    eventDom.removeClass('wz-prototype');
    if(i.title == 'Documentos'){ eventDom.addClass('event-doc'); }
    if(i.title == 'Reunión'){ eventDom.addClass('event-met'); }
    if(i.title == 'Trabajo'){ eventDom.addClass('event-wor'); }
    if(i.title == 'Otros'){ eventDom.addClass('event-oth'); }
    eventDom.addClass('cleanable');
    eventDom.addClass('eventDom');
    var oldEvents = $('.eventDom');
    if(oldEvents.length == 0){
      $('.timeline .line').after(eventDom);
    }else{
      oldEvents.eq(oldEvents.length-1).after(eventDom);
    }
    eventDom.find('.event-desc-title input').focus();
    eventDom.find('.event-title').text(i.title);
    eventDom.find('.event-time').text(i.date+' '+i.time);
    eventDom.find('.event-desc-title .look-mode').text(i.eventName);
    eventDom.find('.event-desc-info').text(i.desc);
    eventDom.find('.delete-event').on('click', function(){
      eventDom.remove();
    });
    if(i.income != ''){
      eventDom.find('.income').show();
      eventDom.find('.income .look-mode').text(i.income);
    }else{
      eventDom.find('.income').hide();
    }
    if(i.expenses != ''){
      eventDom.find('.expenses').show();
      eventDom.find('.expenses .look-mode').text(i.expenses);
    }else{
      eventDom.find('.expenses').hide();
    }
    if(i.duration != ''){
      eventDom.find('.event-min').show();
      eventDom.find('.event-min .look-mode').text(i.duration);
    }else{
      eventDom.find('.event-min').hide();
    }
  });
}

var setBudget = function(expApi){
  var budget = expApi.custom.budget;

  if(budget.price == ''){
    $('.budget-yes').hide();
    $('.budget-no').show();
  }else{
    $('.budget-yes').show();
    $('.budget-no').hide();
  }
  $('.budget .budget-money').text(budget.price);
  $('.budget-pay .pay-way').text(budget.payform);
  var status = $('.budget-status');
  if(budget.status){
    status.addClass('payed');
    status.removeClass('pendient');
    status.find('span').text('Pagado');
  }else{
    status.addClass('pendient');
    status.removeClass('payed');
    status.find('span').text('Pendiente de pago');
  }
  $('.paymentDom').remove();
  if(budget.pays.length == 0){
    $('.no-payments').show();
  }else{
    $('.no-payments').hide();
  }
  for (var i = 0; i < budget.pays.length; i++) {
    var paymentDom = $('.payment.wz-prototype').clone();
    paymentDom.removeClass('wz-prototype');
    orderPayments(paymentDom, budget.pays[i]);
  }
}

var selectContact = function(place){
  $('.select-contact-popup').data('place', place);
  $('.select-contact-back').show();
  $('.select-contact-popup').show();
  wz.contacts.getAccounts(function(err, list){
    list[0].getGroups(function(e, o){
      o[0].getContacts(function(e, o){
        var list = [];
        for (var i = 0; i < o.length; i++) {
          list.push(o[i]);
        }
        list = list.sort(function(a,b){return a.name.first.localeCompare( b.name.first );});
        console.log('lista de contactos', list);
        contactListOrder = [];
        list.forEach(function(i){
          var contact = $('.client-selectable.wz-prototype').clone();
          contact.removeClass('wz-prototype');
          contact.addClass('cleanable');
          setAvatarCon(i, contact);
          if(i.isCompany){
            contact.find('.info-client-selectable').text(i.name.first+' '+i.name.last);
            contact.find('.name-client-selectable').text(i.org.company);
            contact.find('.company-mode').show();
          }else{
            contact.find('.name-client-selectable').text(i.name.first+' '+i.name.last);
            contact.find('.info-client-selectable').text(i.org.company);
            contact.find('.company-mode').hide();
          }
          contact.addClass('contact-selectable');
          contactListOrder.push(contact);
          $('.client-selectable.wz-prototype').before(contact);
          contact.data('contact', i)
          contact.on('click', function(){
            asignContact($(this), place);
          });
        });
      });
    });
  });
}

var asignContact = function(contact, place){
  place.parent().find('.no-entry').remove();
  var contactApi = contact.data('contact');
  composeContact(contactApi, place);
  cleanSelectContact();
  console.log('Contacto asignado', recordActive);
}


var composeContact = function(contactApi, place){
  var contactDom = $('.contact.wz-prototype').clone();
  contactDom.removeClass('wz-prototype');

  var contact = searchContact(contactApi, contactList);

  setAvatarCon(contact, contactDom);
  if(contact.isCompany){
    contactDom.find('.client-subtitle').text(contact.name.first+' '+contact.name.last);
    contactDom.find('.client-title').text(contact.org.company);
    contactDom.find('.company-mode').show();
  }else{
    contactDom.find('.client-title').text(contact.name.first+' '+contact.name.last);
    contactDom.find('.client-subtitle').text(contact.org.company);
    contactDom.find('.company-mode').hide();
  }
  var moreInfo = '';
  var withPhone = false;
  if(contact.phone.length > 0){
    moreInfo += contact.phone[0].value;
    withPhone = true;
  }
  if(contact.email.length > 0){
    if(withPhone){
      moreInfo += ' - '+contact.email[0].value;
    }else{
      moreInfo += contact.email[0].value;
    }
  }
  contactDom.find('.client-moreinfo').text(moreInfo);
  place.after(contactDom);
  var type = getContactType(contactDom);
  contactDom.addClass(type+'Dom');
  contactDom.addClass('cleanable');
  contactDom.data('contact', contact);
  contactDom.find('.remove').on('click', function(){
    deleteContact($(this).parent());
  })
}

var searchContact = function(contact, list){
  var con = contact;
  for (var i = 0; i < list.length; i++) {
    if (list[i].id == contact.id) {
      con = list[i];
    }
  }
  return con;
}

var deleteContact = function(contact){
  var contactApi = contact.data('contact');
  var type = getContactType(contact);
  contact.remove();
  if(type == 'client' && $('.clientDom').length == 0){
    setEmptyContact($('.exp-client .add'));
  }else if(type == 'asigns' && $('.asignsDom').length == 0){
    setEmptyContact($('.exp-asigns .add'));
  }else if(type == 'interest' && $('.interestDom').length == 0){
    setEmptyContact($('.exp-interest .add'));
  }
}

var getContactType = function(contact){
  var type = contact.parent();
  if(type.hasClass('exp-client')){
    type = 'client';
  }else if(type.hasClass('exp-asigns')){
    type = 'asigns';
  }else{
    type = 'interest';
  }
  return type;
}

var addEvent = function(title, eventClass){
  $('.line').show();
  $('.timeline-phantom').hide();
  $('.timeline').show();
  var eventDom = $('.event.wz-prototype').clone();
  eventDom.removeClass('wz-prototype');
  eventDom.addClass(eventClass);
  eventDom.addClass('cleanable');
  eventDom.addClass('eventDom');
  var oldEvents = $('.eventDom');
  if(oldEvents.length == 0){
    $('.timeline .line').after(eventDom);
  }else{
    oldEvents.eq(0).before(eventDom);
  }
  eventDom.find('.delete-event').on('click', function(){
    eventDom.remove();
  });
  if(!editStatus){
    editMode(true);
  }
  eventDom.find('.event-desc-title input').focus();
  eventDom.find('.event-title').text(title);
  eventDom.find('.event-time-input input').val(getCurrentDate());
  eventDom.find('.event-time-select .ui-select-input > .ellipsis').text(getCurrentTime());
  $('.dropdown').hide();
  newEventSelect.removeClass('prepared');
  newEventSelect.removeClass('opened');
}


var addPayment = function(){
  $('.no-payments').hide();
  var paymentDom = $('.payment.wz-prototype').clone();
  paymentDom.removeClass('wz-prototype');
  paymentDom.addClass('paymentDom');
  paymentDom.addClass('new');
  paymentDom.find('.remove').on('click', function(){
    $(this).parent().remove();
    var payments = $('.paymentDom');
    if(payments.length == 0){
      $('.no-payments').show();
    }
  });

  $('.payment.wz-prototype').after(paymentDom);
  if(!editStatus){
    editMode(true);
  }
}

var searchRecord = function(id){
  var found = null;
  var records = $('.record');
  for (var i = 0; i < records.length; i++) {
    var expApi = records.eq(i).data('record');
    if(expApi.id == id){
      found = records.eq(i);
    }
  }
  return found;
}

var saveRecord = function(){
  var expApi = $('.exp.active').data('record');
  if(expApi == null){
    creating = true;
    recordActive = proyectBuilder();
    recordActive = refreshRecordActive(recordActive);
    legal.createProject(recordActive, function(e, o){
      console.log('RECORD AÑADIDO', o);
      recordList.push($('.exp.active'));
      refreshRecords('');
      recordSearchInput.val('')
      o.custom = JSON.parse(o.custom);
      $('.exp.active').data('record', o);

      if (o.custom.client.length > 0) {
        var clientName = '';
        if(o.custom.client[0].isCompany){
          clientName = o.custom.client[0].org.company;
        }else{
          clientName = o.custom.client[0].name.first + ' ' + o.custom.client[0].name.last;
        }
        $( '.exp.active .name-exp' ).text( o.idInternal + ' - ' + clientName );
      }else{
        $( '.exp.active .name-exp' ).text( o.idInternal );
      }

      if ( $( '.exp.active .name-exp' ).text() == '' ) {
        $( '.exp.active .name-exp' ).text( 'Expediente sin cliente' );
      }

      if (o.name != '' && o.id != '') {
        $( '.exp.active .id-exp' ).text( o.id + ' - ' + o.name );
      }else if( o.name != '' ){
        $( '.exp.active .id-exp' ).text( o.name );
      }else if( o.id != '' ){
        $( '.exp.active .id-exp' ).text( o.id );
      }

      setAvatarExp(o, $('.exp.active'));
      if(o.custom.status){
        $('.exp.active .highlight-area').addClass('closed');
      }
      editMode(false);
      orderRecord($('.exp.active'));
    });
  }else{
    recordActive = refreshRecordActive(recordActive);
    expApi.modify(recordActive, function(e,o){
      modifing = true;
      console.log('RECORD MODIFICADO',e, recordActive);

      if (recordActive.custom.client.length > 0) {
        var clientName = '';
        if(recordActive.custom.client[0].isCompany){
          clientName = recordActive.custom.client[0].org.company;
        }else{
          clientName = recordActive.custom.client[0].name.first + ' ' + recordActive.custom.client[0].name.last;
        }
        $( '.exp.active .name-exp' ).text( recordActive.idInternal + ' - ' + clientName );
      }else{
        $( '.exp.active .name-exp' ).text( recordActive.idInternal );
      }

      if ( $( '.exp.active .name-exp' ).text() == '' ) {
        $( '.exp.active .name-exp' ).text( 'Expediente sin cliente' );
      }

      if (recordActive.name != '' && recordActive.id != '') {
        $( '.exp.active .id-exp' ).text( recordActive.id + ' - ' + recordActive.name );
      }else if( recordActive.name != '' ){
        $( '.exp.active .id-exp' ).text( recordActive.name );
      }else if( recordActive.id != '' ){
        $( '.exp.active .id-exp' ).text( recordActive.id );
      }

      setAvatarExp(recordActive, $('.exp.active'));
      if(recordActive.custom.status){
        $('.exp.active .highlight-area').addClass('closed');
      }else{
        $('.exp.active .highlight-area').removeClass('closed');
      }
      editMode(false);
      orderRecord($('.exp.active'));
    });
  }
}

var refreshRecordActive = function(o){
  o.idInternal = $('.extern-id-input').val();
  var expName = $('.name-input').val();
  if(expName == 'Expediente sin nombre'){
    o.name = "";
  }else{
    o.name = $('.name-input').val();
  }
  o.custom.status = $('.ui-select-input > i').hasClass('closed');
  o.description = $('.exp-desc .edit-mode').val();
  o.custom.client = recoverClients();
  o.custom.asigns = recoverAsigns();
  o.custom.interest = recoverInterest();
  o.custom.events = recoverEvents();
  o.custom.budget = recoverBudget();
  o.custom.folder = ($('.exp.active').data('folder') || '');
  console.log('VOY A GUARDAR ESTO', o);
  return o;
}

var recoverClients = function(){
  var clients = [];
  if($('exp-client .no-entry').length == 0){
    var clientsDom = $('.exp-client .contact');
    for (var i = 0; i < clientsDom.length; i++) {
      clients.push(clientsDom.eq(i).data('contact'));
    }
  }
  return clients;
}

var recoverAsigns = function(){
  var asigns = [];
  if($('exp-asigns .no-entry').length == 0){
    var asignsDom = $('.exp-asigns .contact');
    for (var i = 0; i < asignsDom.length; i++) {
      asigns.push(asignsDom.eq(i).data('contact'));
    }
  }
  return asigns;
}

var recoverInterest = function(){
  var interest = [];
  if($('exp-people .no-entry').length == 0){
    var interestDom = $('.exp-people .contact');
    for (var i = 0; i < interestDom.length; i++) {
      interest.push(interestDom.eq(i).data('contact'));
    }
  }
  return interest;
}

var recoverEvents = function(){
  var eventsToApi = [];
  var events = $('.eventDom');
  for (var i = 0; i < events.length; i++) {
    var event = eventBuilder();
    event.title = events.eq(i).find('.event-title').text();
    event.date = events.eq(i).find('.event-time-input input').val();
    event.time = events.eq(i).find('.event-time-select .ui-select-input > .ellipsis').text();
    event.eventName = events.eq(i).find('.event-desc-title .event-title-input').val();
    event.desc = events.eq(i).find('.event-desc-info-input').val();
    event.duration = events.eq(i).find('.event-min .edit-mode').val();
    event.income = events.eq(i).find('.income .edit-mode').val();
    event.expenses = events.eq(i).find('.expenses .edit-mode').val();
    eventsToApi.push(event);
  }
  return eventsToApi;
}

var recoverBudget = function(){

  var budget = budgetBuilder();
  budget.price = $('.budget .budget-money-input').val();
  budget.status = $('.budget .budget-status-input figure').hasClass('active');
  budget.payform = $('.budget-pay .pay-way-input').val();
  budget.pays = recoverPayments();
  return budget;
}

var recoverPayments = function(){
  var payments = $('.paymentDom');
  var paymentsList = [];

  for (var i = 0; i < payments.length; i++) {
    var payment = {"title" : "", "date" : "", "pay" : ""};
    payment.title = payments.eq(i).find('.edit-mode.ui-input').val();
    if(payments.eq(i).hasClass('new')){
      payment.date = getCurrentDate()+' '+getCurrentTime();
      payments.eq(i).removeClass('new');
    }else{
      payment.date = payments.eq(i).find('.date').text();
    }
    payment.pay = payments.eq(i).find('.payment-value-input input').val();
    paymentsList.push(payment);
  }

  return paymentsList;
}

var cancelRecord = function(){
  var expApi = $('.exp.active').data('record');
  editMode(false);
  if(expApi == undefined){
    $('.exp.active').remove();
    var records = $('.record');
    if(records.length == 0){
      welcomePage.show();
    }else{
      records.eq(0).click();
    }
  }else{
    $('.exp.active').click();
  }
}

var cleanWindow = function(){
  $('.cleanable').remove();
}

var cleanInputs = function(){
  $('.intern-id-input').text('');
  $('.extern-id-input').val('');
  $('.name-input').val('');
  $('.exp-status .ui-select-input > i').removeClass('closed');
  $('.exp-status .ui-select-input > article').text('Abierto');
  $('.name-input').val('');
  $('.exp-desc .edit-mode').val('');
  $('.no-entry').remove();
  cleanWindow();
  setClient(null);
  setAsigns(null);
  setInterest(null);
  $('.budget-money-input').val('');
  $('.pay-way-input').val('');
  $('.async').show();
  $('.sync').hide();

}

var cleanSelectContact = function(){
  $('.select-contact-back').hide();
  $('.select-contact-popup').hide();
  $('.contact-selectable').remove();
}

var getCurrentDate = function(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  today = dd+'/'+mm+'/'+yyyy;
  return today;
}


var getCurrentTime = function(){
  var today = new Date();
  var hh = today.getHours();
  var mm = today.getMinutes();

  if(hh<10) {
      hh='0'+hh
  }

  if(mm<10) {
      mm='0'+mm
  }

  return hh+':'+mm;
}

var deleteRecord = function(){
  confirm('¿Seguro que desea eliminar este expediente?', function(o){
    if(o){
      var expApi = $('.exp.active').data('record');
      if(expApi == undefined){
        cancelRecord();
        var records = $('.record');
        if(records.length == 0){
          welcomePage.show();
        }else{
          $('.record').eq(0).click();
        }
      }else{
        editMode(false);
        expApi.remove(function(e,o){
          console.log('RECORD BORRADO',e,o);
          var index = recordList.indexOf(expApi);
          if (index > -1) {
            recordList.splice(index, 1);
          }
          $('.exp.active').remove();
          var records = $('.record');
          if(records.length == 0){
            welcomePage.show();
          }else{
            $('.record').eq(0).click();
          }
        });
      }
    }
  });
}

var linkDocFolder = function(){
  wz.fs.selectSource( { mode: 'directory' } , function(e,o){
    if(!editStatus){
      editMode(true);
    }
    $('.exp.active').data('folder', o[0]);
    saveRecord();
  });
}

var linkNewDocFolder = function(){
  var name = $('.exp.active').data('record');
  if(name == undefined || name.name == ''){
    alert('Antes de asociar una carpeta al expediente, el expediente debe tener un nombre.');
  }else{
    name = name.name;
    wz.fs(recordFolder, function(e, o){
      o.createDirectory(name, function(e, o){
        if(!editStatus){
          editMode(true);
        }
        $('.exp.active').data('folder', o.id);
        saveRecord();
      });
    });
  }
}

var orderRecord = function(record){
  var list = $('.record');
  if (list.length == 0) {
    $('.exp-list').append(record);
  }else{
    for (var i = 0; i < list.length; i++) {
      var x = record.find('.name-exp').text().localeCompare(list.eq(i).find('.name-exp').text());
      if(x == -1){
        list.eq(i).before(record);
        return;
      }
    }
  }
}

var orderPayments = function(payment, pays){
  var list = $('.paymentDom');
  payment.addClass('paymentDom');
  payment.addClass('cleanable');
  payment.find('.title').text(pays.title);
  payment.find('.date').text(pays.date);
  payment.find('.payment-value').text(pays.pay);

  if (list.length == 0) {
    $('.payment-list').append(payment);
    payment.find('.remove').on('click', function(){
      $(this).parent().remove();
    });
  }else{
    for (var i = 0; i < list.length; i++) {
      var x = payment.find('.payment-info .title').text().localeCompare(list.eq(i).find('.payment-info .title').text());
      console.log('Comparo', payment.find('.payment-info .title').text(), 'con', list.eq(i).find('.payment-info .title').text(), 'resultado:', x);
      if(x == -1){
        list.eq(i).before(payment);
        payment.find('.remove').on('click', function(){
          $(this).parent().remove();
        });
        return;
      }
    }
    list.eq(list.length - 1).after(payment);
  }
}

var refreshRecords = function(filter){
  var filterRecords = [];
  $.each(recordList, function(i, record){
    if(
      record.find('.name-exp').text().toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      record.find('.id-exp').text().toLowerCase().indexOf(filter.toLowerCase()) > -1
    ){
      filterRecords.push(record);
    }
  });
  $('.record').hide();
  $.each(filterRecords, function(i, record){
    record.show();
  });
}

var refreshContacts = function(filter){
  var filterContacts = [];
  $.each(contactListOrder, function(i, contact){
    if(
      contact.find('.name-client-selectable').text().toLowerCase().indexOf(filter.toLowerCase()) > -1
    ){
      filterContacts.push(contact);
    }
  });
  $('.contact-selectable').hide();
  $.each(filterContacts, function(i, contact){
    contact.show();
  });
}

// Program run
initLegal();
