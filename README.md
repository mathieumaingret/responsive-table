# Responsive Table

Enable responsive layout on html tables elements

## Requirement

This script requires

  - [jQuery] >= 1.1.4
  - https://github.com/kevinbaubet/devicedetect deviceDetect library to check current device and formats

## Installation

```
<link rel="stylesheet" href="../dist/responsive-table.min.css?v=0.1" media="all" />
<script src="../dist/responsive-table.min.js?v=0.1"></script>
```

## Use

```
// DeviceDetect library instance
var deviceDetect = new $.DeviceDetect();
var deviceDetectDevices = deviceDetect.getDevices();

// Mandatory options
var options = {
    deviceDetect: deviceDetect,
    devices: deviceDetectDevices
};

// Init
$('#content table').responsiveTable(options);
```

## Options

| Key (* is mandatory) | Description | Default value | Examples
|---|---|---|---|
| `deviceDetect` * | *Library instance, using the onResize() method for instance* | undefined |  |
| `devices` * | *(object) Indicate for each available device the current one* | {} | {desktop: true, mobile: false,  tablet: false} |
| `breakpoint` | *(string) On which deviceDetect device the responsive layout can be applied* | mobile |  |
| `reloadOnResize` | *(bool) On window resize, check current device again* | true |
| `allowFallbackOnFirstRow` | *(bool) If no \<thead\> or \<th\> tags are founded for each tables, the first \<tr\> row will be used to get the table labels* | true |
| `labelsDisplay` | *(string) Layout to be applied. By default, 'inline' or 'block' are available* | inline | inline / block |
| `classes` | *(object) HTML classes applied on the \<table\> element* | See below | |

#### HTML Classes option

```
classes: {
    prefix: 'responsive-table',
    initialized: 'is-initialized',
    hasLabels: 'is-label',
    cellWrapper: 'cell-wrapper'
}
```

#### Custom Layout

The `labelsDisplay` simply adds an HTML class, so you can apply whatever you want, as long as you manage this layout in your css declarations.