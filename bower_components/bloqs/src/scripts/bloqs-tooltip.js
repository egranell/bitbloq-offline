'use strict';
(function(bloqsTooltip) {

    var $currentField, $tooltip;

    function addBloqsTooltip($field){
        if($currentField){
            destroyTooltip();
        };
        $currentField = $field;
        $tooltip = createTooltip();
        $currentField.append($tooltip);
    };

    function createTooltip(){
        var $tooltip = $('<div>').attr({
                'id': 'bloqs-tooltip',
                'class': 'tooltip',
                'data-literal':'Im a happy tooltip'
            });

        $tooltip.append('<div class="flecha"></div>');

        return $tooltip;
    };

    function destroyTooltip(){
        if($tooltip){
            $tooltip.remove();
        }
    };

    function showTooltip(text, positionX, positionY){
        $tooltip.css({
            display: 'block',
            top:positionX,
            left: positionY
        });
        $tooltip.attr({
            'data-literal': text
        });
    };

    function hideTooltip(){
        $tooltip.css({
            display:'none'
        });
    };

    bloqsTooltip.addBloqsTooltip = addBloqsTooltip;

    return bloqsTooltip;

})(window.bloqsTooltip = window.bloqsTooltip || {}, undefined);
