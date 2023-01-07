class SiteWatermark{
    /**
     * 
     * @param {string} id 
     * @param {html || string} _html 
     * @param {"bottom-right" || "bottom-left" || "top-left" || "top-right"} defaultLocation 
     * @param {object(width, background, padding, border, position, zIndex, borderRadius, opacity, textAlign)} styleOptions 
     */
    constructor(id, _html, defaultLocation = 'bottom-right', styleOptions = {}, styleConfig, _containerStyles, _container, currentLocation){
        /**
         * Watermark Styles
         */
        this.styleConfig = {
            width : styleOptions.width || 'auto',
            background : styleOptions.background || '#e1e1e1',
            padding : styleOptions.padding || '0.5em 1.5em',
            border : styleOptions.border || '1px solid #bbafaf',
            position : 'fixed',
            "z-index" : styleOptions.zIndex || '99',
            "border-radius" : styleOptions.borderRadius || '15px',
            "min-width" : '15px',
            opacity : styleOptions.opacity || '.5',
            "text-align" : styleOptions.textAlign || 'left',
        }
        defaultLocation = defaultLocation.toLowerCase()
        /**
         * set Default window location
         */
        this.setLocation(defaultLocation)

        // Container styles
        this._containerStyles = this._containerStyles

        // Watermark Container Element
        this._container = document.createElement('div')

        // Watermark Container Element ID
        this.id = id

        // Watermark Container Element Content/innerHTML
        this._html = _html
        this.currentLocation = defaultLocation

        // Watermark Container Element hover Event Listener
        this._container.addEventListener('mouseenter', function(e){
            e.preventDefault();
            if(this.currentLocation == 'bottom-right'){
                this.currentLocation = 'bottom-left'
            }else if(this.currentLocation == 'bottom-left'){
                this.currentLocation = 'top-left'
            }else if(this.currentLocation == 'top-left'){
                this.currentLocation = 'top-right'
            }else if(this.currentLocation == 'top-right'){
                this.currentLocation = 'bottom-right'
            }
            this.setLocation(this.currentLocation)
            this.init()
        }.bind(this))
    }
    /**
     * Set Watermark Location
     * @param {"bottom-right" || "bottom-left" || "top-left" || "top-right"} location 
     */
    setLocation(location){
        /**
         * Reset container position
         */
        if(!!this.styleConfig.top)
            delete this.styleConfig.top;
        if(!!this.styleConfig.bottom)
            delete this.styleConfig.bottom;
        if(!!this.styleConfig.right)
            delete this.styleConfig.right;
        if(!!this.styleConfig.left)
            delete this.styleConfig.left;

        /**
         * Update container position
         */
        if(location == "bottom-right"){
            this.styleConfig.bottom = ".5em";
            this.styleConfig.right = ".5em";
        }else if(location == "top-right"){
            this.styleConfig.top = "4em";
            this.styleConfig.right = ".5em";
        }else if(location == "top-left"){
            this.styleConfig.top = "4em";
            this.styleConfig.left = ".5em";
        }else if(location == "bottom-left"){
            this.styleConfig.bottom = ".5em";
            this.styleConfig.left = ".5em";
        }else{
            this.styleConfig.bottom = ".5em";
            this.styleConfig.right = ".5em";
        }
    }
    /**
     * Initialize Watermark
     */
    init(){
        this._containerStyles = Object.assign([], Object.keys(this.styleConfig).map(k => { return `${k}:${this.styleConfig[k]}` }))
        this._containerStyles = this._containerStyles.join(";")
        this._container.setAttribute('style', this._containerStyles)
        this._container.setAttribute('id', this.id)
        this._container.innerHTML = this._html
        document.body.appendChild(this._container)
    }
    /**
     * Update Watermark Container Styles
     * @param {str} style 
     * @param {str} value 
     */
    setStyle(style, value){
        this.styleConfig[style] = value
        this.init()
    }
    /**
     * Update Watermark Content
     * @param {HTML or string} html 
     */
    setHTML(html){
        this._html = html
        this.init()
    }
    
}
/**
 * This simple project was developed by:
 * oretnom23@gmail.com
 * 
 * SourceCode has been published @:
 * https://sourcecodester.com
 * 
 * 01-07-2023
 */