define( [
	'aloha',
	'aloha/jquery',
	'aloha/plugin',
	'aloha/floatingmenu',
	'i18n!textcolor/nls/i18n'
], function (Aloha, jQuery, Plugin, FloatingMenu, i18n) {

    return Plugin.create( 'textcolor', {
		/**
		 * Configure the available languages
		 */
		languages: [ 'pt-br' ],
        defaults: {
          colors: [
            'black', 'dimgray', 'gray', 'darkgray', 'lightgray', 'white',
            'red', 'green', 'blue', 'yellowgreen', 'cadetblue', 'coral'
          ],
          auto_add_buttons: true
        },
        init: function() {
          var style = jQuery('<style></style>');
          var buttons = {};

          jQuery.each(this.settings.colors, function(index, value){
            style.append('button.GENTICS_button_'+ value +' { background: '+ value +' !important; } ');

            buttons[value] = new Aloha.ui.Button({
              'name' : "TextColor_button_" + value,
              'tooltip': i18n.t('textcolor.tooltip.color.'+value),
		      'toggle' : true,
              "iconClass" : "GENTICS_button_" + value,
              "size" : "small",
              "onclick": function () {
                if (Aloha.activeEditable) {
                        Aloha.activeEditable.obj[0].focus()
                    }
                    var markup = jQuery('<span style="color:' + value + '"></span>');
                    var rangeObject = Aloha.Selection.rangeObject;
                    var foundMarkup = rangeObject.findMarkup(function() {
                        return this.nodeName.toLowerCase() == markup.get(0).nodeName.toLowerCase()
                    },
                    Aloha.activeEditable.obj);

                    if (foundMarkup) {
                      jQuery(foundMarkup).css('color', value);
                    } else {
                        GENTICS.Utils.Dom.addMarkup(rangeObject, markup)
                    }
                    rangeObject.select();
                    return false
              }
            });
          });

          style.appendTo('head');

          // // add it to the floating menu
          // FloatingMenu.addButton(
          //    'Aloha.continuoustext',
          //   button,
          //   GENTICS.Aloha.i18n(GENTICS.Aloha, 'floatingmenu.tab.format'),
          //   1
          //);
          
          var colors = {first: []}
          jQuery.each(this.settings.colors, function(index, value){
            FloatingMenu.addButton(
              'Aloha.continuoustext',
              buttons[value], 
              i18n.t("textcolor.tab.color"), 
              1
            );
            colors.first[index] = "TextColor_button_" + value;
          });
          if (this.settings.auto_add_buttons) {
              var tabs = Aloha.settings.toolbar.tabs || {};
              tabs[i18n.t('textcolor.tab.color')] = colors;
          }
        }
    });
});

