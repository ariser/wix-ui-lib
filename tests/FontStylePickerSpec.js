describe('FontStylePicker', function () {
    'use strict';

    var element;
    beforeEach(function(){
        element = $('<div wix-param="fontStyle" wix-ctrl="FontStylePicker"></div>').appendTo('body')[0];
    });

    afterEach(function(){
        Wix.UI.destroy(element);
    })

    it('should set the correct font style name for each item in the dropdown', function(){
        Wix.UI.initializePlugin(element);
        var $fontPicker = $(".font-style-picker");
        $fontPicker.find('.box-like-drop').click();

        waitsFor(function(){
            return $fontPicker.find("[wix-ctrl='Popup']").length == 1;
        }, "The font picker won't ever be shown", 500);

        runs(function(){
            var $popup = $fontPicker.find("[wix-ctrl='Popup']");
            expect($popup.length).toBe(1);
            var $style = $popup.find("[wix-ctrl='Dropdown']");
            expect($style.length).toBe(1);

            var $options = $style.find('.option');
            _.each($options, function(option){
                var $option = $(option);
                if (!$option.hasClass('current-item')){
                    var style = $option.attr('data-value');
                    var styleDisplayName = $option.find('.font').html();
                    expect(styleDisplayName).toBe(givenFontName(style));
                }

            });
        });
    });

    it('should set the correct font class name for each item in the dropdown', function(){
        Wix.UI.initializePlugin(element);
        var $fontPicker = $(".font-style-picker");
        var $popup = $fontPicker.find("[wix-ctrl='Popup']");
        expect($popup.length).toBe(1);
        var $style = $popup.find("[wix-ctrl='Dropdown']");
        expect($style.length).toBe(1);
        var $options = $style.find('.option');

        _.each($options, function(option){
            var $option = $(option);
            if (!$option.hasClass('current-item')){
                var style = $option.attr('data-value');
                var font = Wix.Styles.getStyleFontByReference(style);
                var fontEl = $option.find('.font');
                var fontFamily = fontEl.css('font-family');
                expect(fontFamily).toBe('arial');
            }

        });
    });

    it('should handle "Custom" per spec', function(){
        Wix.UI.initializePlugin(element);
        var $fontPicker = $(".font-style-picker");
        var $popup = $fontPicker.find("[wix-ctrl='Popup']");
        expect($popup.length).toBe(1);
        var $style = $popup.find("[wix-ctrl='Dropdown']");
        expect($style.length).toBe(1);

        var customEl = $style.find('.custom');
        expect(customEl).toBeDefined();
        var styleDisplayName = customEl.find('.font').html();
        expect(styleDisplayName).toBe("Custom");

    });

    function givenFontName(preset){
        if (preset == "Custom") {
            return "Custom";
        }
        return preset.replace(/-/g,' ');
    }
});
