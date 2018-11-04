(function ($) {
    'use strict';

    $.ResponsiveTable = function (elements, options) {
        // Dom elements
        this.elements = {
            tables: elements
        };

        // Settings
        $.extend(true, (this.settings = {}), $.ResponsiveTable.defaults, options);

        // Init
        if (this.prepareRequiredOptions()) {
            return this.init();
        }

        return this;
    };

    $.ResponsiveTable.defaults = {
        devices:                undefined, // *
        deviceDetect:           undefined, // *
        breakpoint:             'mobile',
        reloadOnResize:         true,
        allowFallbackOnFirstRow: true,
        labelsDisplay:          'inline', // inline / block
        classes: {
            prefix: 'responsive-table',
            initialized: 'is-initialized',
            hasLabels: 'is-label',
            cellWrapper: 'cell-wrapper'
        }
    };

    $.ResponsiveTable.prototype = {
        /**
         * Set required settings and prevent loading if they are missing or broken
         * @returns {boolean}
         */
        prepareRequiredOptions: function () {
            var self = this;

            if (self.elements.length === 0) {
                return false;
            }

            // DeviceDetect library is mandatory
            if ((self.settings.devices === undefined) && (typeof $.DeviceDetect !== undefined)) {
                self.settings.deviceDetect = new $.DeviceDetect();
                self.settings.devices = self.settings.deviceDetect.getDevices();
            }
            if (self.settings.devices === undefined) {
                console.error('deviceDetect is required but missing.');
                return false;
            }

            return true;
        },

        /**
         * Init script behaviours
         * @returns {$.ResponsiveTable}
         */
        init: function () {
            var self = this;

            self.execute();

            // Execute again on resize / orientation changes
            if (self.settings.reloadOnResize) {
                self.settings.deviceDetect.onResize(function () {
                    self.settings.devices = this.deviceDetect.devices;
                    self.execute();
                });
            }

            return this;
        },

        /**
         * Treat each table
         */
        execute: function () {
            var self = this;

            self.elements.tables.each(function (i, table) {
                table = $(table);
                table.addClass(self.settings.classes.prefix + ' l-cells-' + self.settings.labelsDisplay);

                if (self.settings.devices[self.settings.breakpoint] === true) {
                    var labels;

                    table.addClass(self.settings.classes.initialized);

                    // Get labels
                    if ((table.find('th').length === 0) && self.settings.allowFallbackOnFirstRow) {
                        labels = self.getFirstRowLabels(table)
                    }
                    else {
                        labels = self.getHeadLabels(table);
                    }

                    // Apply layout and classes
                    self.setResponsiveLayout(table, labels);

                    if (labels !== undefined && labels.length) {
                        table.addClass(self.settings.classes.hasLabels);
                    } else {
                        table.removeClass(self.settings.classes.hasLabels);
                    }
                }
                else {
                    table.removeClass(self.settings.classes.hasLabels + ' ' + self.settings.classes.initialized);
                }
            });
        },

        /**
         * Apply responsive behaviours and remove inline styles
         * @param table
         * @param labels
         */
        setResponsiveLayout: function (table, labels) {
            var self = this;

            table.find('tr, td, th').removeAttr('style');

            if (labels.length) {
                table.find('tr').each(function (trIndex, tr) {
                    tr = $(tr);

                    tr.children().each(function (cellIndex, cell) {
                        cell = $(cell);

                        cell
                            .attr({
                                'data-head-label': labels[cellIndex]
                            })
                            .html($('<div>', {
                                'class': self.settings.classes.cellWrapper,
                                'html': cell.html()
                            }));
                    });
                });
            }
        },

        /**
         * Get first tbody tr values
         * @param table
         * @returns {Array}
         */
        getFirstRowLabels: function (table) {
            var labels = [];

            table.find('tr').eq(0).children('td').each(function (i, cell) {
                labels.push($(cell).text());
            });

            return labels;
        },

        /**
         * Get thead values
         * @param table
         * @returns {Array}
         */
        getHeadLabels: function (table) {
            var labels = [];

            table.find('thead > tr').eq(0).children('th, td').each(function (i, cell) {
                labels.push($(cell).text());
            });

            return labels;
        }
    };

    $.fn.responsiveTable = function (options) {
        return new $.ResponsiveTable($(this), options);
    };

})(jQuery);
