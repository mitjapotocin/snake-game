/*
CircularSlider class takes in one argument (Type: object)

Options object properties:
container (DOM element) - mandatory
radius (Number) - mandatory
color (String) - mandatory
minValue (Number) - mandatory
maxValue (Number) - mandatory
step (Number) - mandatory
name (String) - optional
currency (Currency) - optional
*/

export default class CircularSlider {
  constructor(options) {
    this.container = options.container
    this.radius = options.radius
    this.color = options.color
    this.minValue = options.minValue
    this.maxValue = options.maxValue
    this.step = options.step
    this.name = options.name || ''
    this.currency = options.currency || ''

    this.svgNS = 'http://www.w3.org/2000/svg'
    this.grabberDraggable = false
    this.range = this.maxValue - this.minValue
    this.circumference = 2 * Math.PI * this.radius
    this.stepInCircumference = (this.range / this.step) * this.circumference
    this.stepAngle = (this.step / this.range) * 2 * Math.PI
    this.baseStrokeColor = '#dadada'
    this.grabberStroke = '#cccccc'
    this.grabberFill = '#ffffff'
    this.strokeWidth = 30
    this.grabberStrokeWidth = 2
    this.strokeGap = 2
    this.svgSize = this.radius * 2 + this.strokeWidth + 2 * this.grabberStrokeWidth
    this.initialized = this.container.classList.contains('circular-slider-initialized')

    this.initialize()
  }

  initialize() {
    this.initialized ? this.selectAndUpdateSize() : this.initializeFirstInstance()

    this.createLegend()
    this.createCircleSvg()
  }

  createLegend() {
    const legend = document.createElement('div')
    const legendColorIndicator = document.createElement('div')
    const legendName = document.createElement('span')
    this.legendValue = document.createElement('span')

    legendName.classList.add('legend-name')
    this.legendValue.classList.add('legend-value')

    this.setAttributes(legend, {
      class: 'legend-item',
      style: `border-color: ${this.color}`,
    })

    this.setAttributes(legendColorIndicator, {
      class: 'legend-color-indicator',
      style: `background: ${this.color}`,
    })

    this.legendValue.innerHTML = this.currency + this.minValue
    legendName.innerHTML = this.name

    legend.append(this.legendValue, legendName, legendColorIndicator)
    this.legendContainer.append(legend)
  }

  createCircleSvg() {
    const circleWrapper = document.createElementNS(this.svgNS, 'g')
    const baseCircle = document.createElementNS(this.svgNS, 'circle')
    const clickableCircle = document.createElementNS(this.svgNS, 'circle')
    this.grabber = document.createElementNS(this.svgNS, 'circle')
    this.indicatorCircle = document.createElementNS(this.svgNS, 'circle')

    // Circle stroke dash is relative to step value
    let strokeDashCalculated = (this.step / this.range) * this.circumference - this.strokeGap

    // Not smaller than stroke gap
    // Adjust stroke dash, so that the circle always ends with a stroke gap
    if (strokeDashCalculated < this.strokeGap) {
      strokeDashCalculated =
        this.strokeGap +
        (this.circumference % (2 * this.strokeGap)) / Math.floor(this.circumference / (2 * this.strokeGap))
    }

    const commonAttributes = {
      cx: 0,
      cy: 0,
      r: this.radius,
      fill: 'none',
    }

    this.setAttributes(baseCircle, {
      ...commonAttributes,
      stroke: this.baseStrokeColor,
      transform: 'rotate(-90, 0, 0)',
      'stroke-width': this.strokeWidth,
      'stroke-dasharray': `${strokeDashCalculated} ${this.strokeGap}`,
    })

    this.setAttributes(this.indicatorCircle, {
      ...commonAttributes,
      stroke: this.color,
      opacity: 0.7,
      transform: 'rotate(-90, 0, 0)',
      'stroke-width': this.strokeWidth,
      'stroke-dasharray': `0  ${this.circumference}`,
    })

    this.setAttributes(clickableCircle, {
      ...commonAttributes,
      stroke: 'transparent',
      'stroke-width': this.strokeWidth,
    })

    this.setAttributes(this.grabber, {
      cx: 0,
      cy: -this.radius,
      r: this.strokeWidth / 2 + this.grabberStrokeWidth / 2,
      fill: this.grabberFill,
      stroke: this.grabberStroke,
      'stroke-width': this.grabberStrokeWidth,
      style: 'touch-action: none',
    })

    const updateValues_ = this.updateValues.bind(this)

    // Click events
    clickableCircle.addEventListener('click', updateValues_)

    this.grabber.addEventListener('mousedown', () => {
      this.grabberDraggable = true
      document.addEventListener('mousemove', updateValues_)
    })

    document.addEventListener('mouseup', () => {
      if (this.grabberDraggable) {
        document.removeEventListener('mousemove', updateValues_)
        this.grabberDraggable = false
      }
    })

    // Touch events
    this.grabber.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault()

        this.grabberDraggable = true
        document.addEventListener('touchmove', updateValues_, { passive: false })
      },
      { passive: false }
    )

    document.addEventListener('touchend', () => {
      if (this.grabberDraggable) {
        document.removeEventListener('touchmove', updateValues_)
        this.grabberDraggable = false
      }
    })

    // Append all elements to SVG
    circleWrapper.append(baseCircle, this.indicatorCircle, clickableCircle, this.grabber)
    this.sliderSvg.append(circleWrapper)
  }

  updateValues(e) {
    e.preventDefault()

    const sliderSvgDimensions = this.sliderSvg.getBoundingClientRect()

    const svgCenter = {
      x: sliderSvgDimensions.x + sliderSvgDimensions.height / 2,
      y: sliderSvgDimensions.y + sliderSvgDimensions.width / 2,
    }

    const pageX = e.clientX || e.changedTouches[0].clientX
    const pageY = e.clientY || e.changedTouches[0].clientY

    // Event position difference from center
    const dx = pageX - svgCenter.x
    const dy = svgCenter.y - pageY

    // Positive angle value in radians
    const eventAngle = (Math.atan2(dx, dy) + 2 * Math.PI) % (2 * Math.PI)

    const stepAdjustedAngle = Math.round(eventAngle / this.stepAngle) * this.stepAngle

    this.setAttributes(this.grabber, {
      cx: this.radius * Math.sin(stepAdjustedAngle),
      cy: -this.radius * Math.cos(stepAdjustedAngle),
    })

    const valueInCircumference = (stepAdjustedAngle / (2 * Math.PI)) * this.circumference

    this.setAttributes(this.indicatorCircle, {
      'stroke-dasharray': `${valueInCircumference} ${this.circumference - valueInCircumference}`,
    })

    this.legendValue.innerHTML =
      this.currency + (Math.round((stepAdjustedAngle / (2 * Math.PI)) * this.range) + this.minValue)
  }

  selectAndUpdateSize() {
    this.sliderSvg = this.container.querySelector('.circular-slider-svg')
    this.legendContainer = this.container.querySelector('.legend-container')

    if (this.svgSize > this.sliderSvg.getAttribute('height')) {
      this.setSvgSize()
    }
  }

  initializeFirstInstance() {
    this.sliderSvg = document.createElementNS(this.svgNS, 'svg')
    this.setSvgSize()
    this.createSliderContainers()
    this.sliderSvg.classList.add('circular-slider-svg')
    this.container.classList.add('circular-slider-container', 'circular-slider-initialized')
    this.sliderContainer.append(this.sliderSvg)
  }

  setSvgSize() {
    this.setAttributes(this.sliderSvg, {
      viewBox: `${-this.svgSize / 2} ${-this.svgSize / 2} ${this.svgSize} ${this.svgSize}`,
      width: this.svgSize,
      height: this.svgSize,
    })
  }

  createSliderContainers() {
    this.legendContainer = document.createElement('div')
    this.sliderContainer = document.createElement('div')

    this.legendContainer.classList.add('legend-container')
    this.sliderContainer.classList.add('slider-container')

    this.container.append(this.legendContainer, this.sliderContainer)
  }

  setAttributes(el, attributeAndValue) {
    Object.entries(attributeAndValue).forEach(([attribute, value]) => {
      el.setAttribute(attribute, value)
    })
  }
}
