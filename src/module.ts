import CookiesService from '@/services/cookies.service';
import ResponseService from '@/services/response.service';
import HttpService from '@/services/http.service';
import UserService from '@/services/user.service';
import GlobalService from '@/services/global.service';
import ValidateService from '@/services/validate.service';
import TimestampService from '@/services/timestamp.service';
import BudgetService from '@/services/budget.service';

export const budgetService = new BudgetService();
export const cookiesService = new CookiesService();
export const globalService = new GlobalService();
export const responseService = new ResponseService();
export const timestampService = new TimestampService();
export const validateService = new ValidateService();

export const httpService = new HttpService(cookiesService);
export const userService = new UserService(httpService, responseService);
