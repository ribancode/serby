"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MENUITEMS = [
    {
        label: 'Navigation',
        main: [
            {
                state: 'dashboard',
                name: 'Dashboard',
                type: 'link',
                icon: 'ti-home'
            },
            {
                state: 'widget',
                name: 'Widget',
                type: 'link',
                icon: 'ti-view-grid',
                badge: [
                    {
                        type: 'danger',
                        value: '100+'
                    }
                ]
            }
        ],
    },
    {
        label: 'UI Element',
        main: [
            {
                state: 'basic',
                name: 'Manage Categories',
                type: 'sub',
                icon: 'ti-layout-grid2-alt',
                children: [
                    {
                        state: 'alert',
                        name: 'Alert'
                    },
                    {
                        state: 'breadcrumb',
                        name: 'Breadcrumbs'
                    },
                    {
                        state: 'button',
                        name: 'Button'
                    },
                    {
                        state: 'accordion',
                        name: 'Accordion'
                    },
                    {
                        state: 'generic-class',
                        name: 'Generic Class'
                    },
                    {
                        state: 'tabs',
                        name: 'Tabs'
                    },
                    {
                        state: 'label-badge',
                        name: 'Label Badge'
                    },
                    {
                        state: 'typography',
                        name: 'Typography'
                    },
                    {
                        state: 'other',
                        name: 'Other'
                    },
                ]
            },
        
            {
                state: 'animations',
                name: 'Animations',
                type: 'link',
                icon: 'ti-reload rotate-refresh'
            }
        ]
    },
    {
        label: 'Forms',
        main: [
            {
                state: 'forms',
                name: 'Form Components',
                type: 'sub',
                icon: 'ti-layers',
                children: [
                    {
                        state: 'basic-elements',
                        name: 'Form Components'
                    }, {
                        state: 'add-on',
                        name: 'Form-Elements-Add-On'
                    }, {
                        state: 'advance-elements',
                        name: 'Form-Elements-Advance'
                    }, {
                        state: 'form-validation',
                        name: 'Form Validation'
                    }
                ]
            }, {
                state: 'picker',
                main_state: 'forms',
                name: 'Form Picker',
                type: 'link',
                icon: 'ti-pencil-alt',
                badge: [
                    {
                        type: 'warning',
                        value: 'New'
                    }
                ]
            }, {
                state: 'select',
                main_state: 'forms',
                name: 'Form Select',
                type: 'link',
                icon: 'ti-shortcode'
            }, {
                state: 'masking',
                main_state: 'forms',
                name: 'Form Masking',
                type: 'link',
                icon: 'ti-write'
            }
        ]
    },
   
    {
        label: 'Chart And Map',
        main: [
            {
                state: 'landing',
                name: 'Landing Page',
                type: 'link',
                icon: 'ti-mobile',
                target: true
            }
        ]
    },

    {
        label: 'App',
        main: [
            {
                state: 'crm-contact',
                name: 'CRM Contact',
                type: 'link',
                icon: 'ti-layout-list-thumb'
            }, {
                state: 'task',
                name: 'Task',
                type: 'sub',
                icon: 'ti-check-box',
                children: [
                    {
                        state: 'list',
                        name: 'Task List'
                    }, {
                        state: 'board',
                        name: 'Task Board'
                    }, {
                        state: 'details',
                        name: 'Task Details'
                    }, {
                        state: 'issue',
                        name: 'Issue List'
                    }
                ]
            }
        ]
    },
    {
        label: 'Extension',
        main: [
            {
                state: 'editor',
                name: 'Editor',
                type: 'sub',
                icon: 'ti-pencil-alt',
                children: [
                    {
                        state: 'none',
                        name: 'No One'
                    }
                ]
            }, {
                state: 'invoice',
                name: 'Invoice',
                type: 'sub',
                icon: 'ti-layout-media-right',
                children: [
                    {
                        state: 'basic',
                        name: 'Invoice'
                    }, {
                        state: 'summary',
                        name: 'Invoice Summary'
                    }, {
                        state: 'list',
                        name: 'Invoice List'
                    }
                ]
            }, {
                state: 'file-upload',
                name: 'File Upload',
                type: 'link',
                icon: 'ti-cloud-up'
            }, {
                state: 'change-log',
                name: 'Change Log',
                type: 'link',
                icon: 'ti-list',
                badge: [
                    {
                        type: 'warning',
                        value: '1.0'
                    }
                ]
            }
        ]
    },
    {
        label: 'Support',
        main: [
            {
                state: 'documentation',
                name: 'Documentation',
                type: 'link',
                icon: 'ti-file'
            }, {
                state: 'submit-issue',
                name: 'Submit Issue',
                type: 'link',
                icon: 'ti-layout-list-post'
            }
        ]
    }
];
var MenuItems = (function () {
    function MenuItems() {
    }
    MenuItems.prototype.getAll = function () {
        return MENUITEMS;
    };
    return MenuItems;
}());
MenuItems = __decorate([
    core_1.Injectable()
], MenuItems);
exports.MenuItems = MenuItems;
