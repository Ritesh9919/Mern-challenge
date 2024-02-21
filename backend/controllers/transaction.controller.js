import {Transaction} from '../models/transaction.model.js';
import axios from 'axios';
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const apiUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

const initializeTransaction = async(req, res)=> {
   try {
     const response = await axios.get(apiUrl);
     const data = response.data;
     const transactions = await Transaction.insertMany(data);

     return res.json(new ApiResponse(200,transactions,'Transactions added successfully'));
     
   } catch (error) {
      throw new ApiError(500, 'Something went wrong!, try again later');
   }
}


const transactions = async(req, res)=> {
   try {
      const { month, searchText = '', page = 1, perPage = 10 } = req.query;
      const regex = new RegExp(searchText,'i');
       

      const transactions = await Transaction.find({
         dateOfSale:{$regex:new RegExp(month,'i')},
         $or:[
            {title:regex},
            {description:regex},
            {price:{$regex:regex}}
         ]
      }).skip((page - 1) * perPage).limit(parseInt(perPage));
      
      
      if(!transactions) {
         throw new ApiError(404, 'Transaction does not exist');
      }
      return res.json(new ApiResponse(200,transactions,'Transaction fetched successfully'));
   } catch (error) {
      console.log(error);
      throw new ApiError(500, 'Something went wrong!, try again later');
   }
}




export {
   initializeTransaction,
   transactions
}

