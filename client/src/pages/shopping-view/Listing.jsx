import React, { useEffect,useState } from 'react'
import ProductFilter from '@/components/shopping-view/filter'

import { DropdownMenu,DropdownMenuContent,DropdownMenuRadioGroup,DropdownMenuRadioItem,DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ArrowDownUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sortOptions } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '@/store/admin/products-slice'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice'
import ShoppingProductTile from './product-tile'
import { useSearchParams } from 'react-router-dom'
import ProductDetailsDialog from '@/components/shopping-view/product-details'

function createSearchParamsHelper(filterParams){
  const queryParams=[];
  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length >0){
      const paramValue= value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }

  return queryParams.join('&');
}

function ShoppingListing() {
  
  const dispatch=useDispatch();
  const {productList,productDetails}=useSelector(state=> state.shopProducts)
  const [filters,setFilters]=useState({})
  const [sort,setSort]= useState(null)
  const [searchParams,setSearchParams]=useSearchParams();
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false);

  function handleSort(value){
    setSort(value)    
  }
 //section-{category,brand}
 //option -options withing the section
  function handleFilter(getSectionId,getCurrentOption){
    console.log(getSectionId,getCurrentOption);

    //checking if the index of the filter is present or not
    let cpyFilters={...filters};
    const indexOfCurrentSection=Object.keys(cpyFilters).indexOf(getSectionId);
  //In JavaScript, using square brackets around a variable name inside an object literal—like [getSectionId]—is called a computed property name.
    if(indexOfCurrentSection === -1){
      cpyFilters={
        ...cpyFilters,
        [getSectionId]:[getCurrentOption]
      }
    }
    else{
      const indexOfcurrentOption=cpyFilters[getSectionId].indexOf(getCurrentOption);
      console.log(indexOfcurrentOption,'ips');
      
      if(indexOfcurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption)
      else cpyFilters[getSectionId].splice(indexOfcurrentOption,1);
    }
    console.log(cpyFilters);
    setFilters(cpyFilters);
    //set this values in the session storeage
    
    
    sessionStorage.setItem("filters",JSON.stringify(cpyFilters));
  }
  function handleGetProductDetails(getCurrentProductId){
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  useEffect(()=>{
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[])

  useEffect(()=>{
    if(filters && Object.keys(filters).length>0){
     const createQueryString=createSearchParamsHelper(filters);
     setSearchParams(new URLSearchParams(createQueryString));
    }
  },[filters])
  
  useEffect(()=>{
  if(filters!==null && sort!==null)
  dispatch(fetchAllFilteredProducts({filterParams:filters,sortParams:sort}))
  },[dispatch,sort,filters])
  
  useEffect(()=>{
   if(productDetails!==null) setOpenDetailsDialog(true)
  },[productDetails])

  console.log(productList,'productList');
  console.log(productDetails,filters,searchParams.toString(),'filters')

  return <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
    <ProductFilter filters={filters} handleFilter={handleFilter}/>
    <div className="bg-background w-full rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center  justify-between">
        <h2 className="text-lg font-extrabold ">All Products</h2>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">{productList.length} Products</span>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
             <ArrowDownUp  className="h-4 w-4"/>
             <span>sort by</span>

            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
             <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>

             {
              sortOptions.map(sortItem=>< DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}> {sortItem.label}</DropdownMenuRadioItem>)
             }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {
        productList && productList.length>0 ?
        productList.map(productItem =>  <ShoppingProductTile product={productItem} handleGetProductDetails={handleGetProductDetails} key={productItem._id}/>):null
      }
      </div>
    </div>
  
   <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
  </div>
}

export default ShoppingListing