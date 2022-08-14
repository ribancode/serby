import { environment } from "src/environments/environment";


export class ApiUrlConstant {
    private static appUrl = environment.url;

    /* Common Api's url */
    public static get VERIFYOTP(): string {
        return this.appUrl + 'verifyOTP';
    }

    /* CE Api's url*/
    public static get CELOGIN(): string {
        return this.appUrl + 'login/CE';
    }

    public static get CESIGNUP(): string {
        return this.appUrl + 'signup/CE';
    }

    public static get CEFORGOTPASSWORD(): string {
        return this.appUrl + 'forgotpassword/CE';
    }

    public static get CERESETPASSWORD(): string {
        return this.appUrl + 'resetpassword/CE';
    }

    public static get CATEGORIES(): string {
        return this.appUrl + 'manageCategories/CE';
    }

    public static get SUBCATEGORIES(): string {
        return this.appUrl + 'manageCategories/subCategories/CE';
    }

    public static get SUBMITCATEGORIES(): string {
        return this.appUrl + 'manageCategories/subCategoriesSubmit/CE';
    }

    public static get CECATEGORIES(): string {
        return this.appUrl + 'getCategories/CE';
    }

    public static get CESUBCATEGORIES(): string {
        return this.appUrl + 'getSubCategories/CE';
    }

    /* User Api's url */
    public static get LOGIN(): string {
        return this.appUrl + 'login/user';
    }
    
    public static get SIGNUP(): string {
        return this.appUrl + 'signup/user';
    }

    public static get FORGOTPASSWORD(): string {
        return this.appUrl + 'forgotpassword/user';
    }

    public static get RESETPASSWORD(): string {
        return this.appUrl + 'resetpassword/user';
    }  
    
    public static get GETCATEGORIES(): string {
        return this.appUrl + 'all-categories';
    } 
    public static get GETSUBCATEGORIES(): string {
        return this.appUrl + 'category/sub-categories';
    } 

    

}