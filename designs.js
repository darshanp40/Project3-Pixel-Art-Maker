(function(){
    /**
    * @description creates  a grid with specified height and width
    */
    function makeGrid() {
        var colorSelected = document.getElementById("colorPicker").value,
            gridWidth = document.getElementById("input_width").value,
            gridHeight = document.getElementById("input_height").value,
            xCount = 0,
            yCount = 0,
            tableHTML = "",
            element,
            elements,
            iCount;

        //loop over the grid rows and columns
        for(xCount = 0; xCount < gridWidth; xCount++) {
            tableHTML += "<tr>";
            for(yCount = 0; yCount < gridHeight; yCount++) {
                tableHTML += "<td></td>";
            }
            tableHTML += "</tr>";
        }
        // add the grid created in the above loop to the HTML
        document.getElementById("pixel_canvas").innerHTML = tableHTML;

        // add event listener to each of the box inside the grid
        elements = document.getElementById("pixel_canvas").getElementsByTagName("td");
        for(iCount = 0; iCount < elements.length; iCount++) {
            element = elements[iCount];
            element.addEventListener("click", function() {
                if(hexc(this.style.backgroundColor) !== colorSelected) {
                    this.style.backgroundColor = colorSelected;
                } else {
                    this.style.backgroundColor = "#fff";          
                }
            });
        }
        
        // change the color inside the color picker
        document.getElementById("colorPicker").addEventListener("change", function(){
            colorSelected = this.value;
        });
    }

    /**
    * @description converts a color with rgb or rgba value to hexadecimal
    * @param {string} colorval - color value in rgb or rgba format
    * @returns {number} hex value of the color specified
    */
    function hexc(colorval) {
        if(colorval) {
            // check whether the color format is rgb or rgba
            var parts = colorval.indexOf("rgba") > -1 ? colorval.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/) : colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            delete(parts[0]);

            for (var i = 1; i <= 3; ++i) {
                parts[i] = parseInt(parts[i]).toString(16);
                if (parts[i].length == 1) parts[i] = '0' + parts[i];
            }
            color = '#' + parts.join('');
            return color;
        }
        return colorval;
    }

    // add event listener to the submit form when the document is ready
    document.getElementById("sizePicker").addEventListener("submit", function (e) { 
        e.preventDefault();
        makeGrid();
    });
})();
