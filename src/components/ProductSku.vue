<template>
  <div class="product-sku">
  	<div class='skuItems' v-if = "skuData.length" v-for="(categoryItem,categoryIndex) in skuData">
  		<div class='categoryTitle'>{{categoryItem.catePropertyName}}</div>
  		<div class='categoryContent'>
  			<template v-for='(item,index) in categoryItem.options'>
  				<el-checkbox :key='item.catePropertyValue' :label='item.catePropertyValue' v-model='categoryItem.values[index].value' :true-label='item.catePropertyValue' false-label='' @change='changeCategory(categoryItem.values[index])'></el-checkbox>
  			</template>
  		</div>
  	</div>
  </div>
</template>

<script>
  export default {
    components: {
      
    },
    data() {
      return {
      	initsku:[]
      }
    },
    props: {
      skuData: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    mounted () {

    },
    created(){
    	this.initsku = this.initskuData();
		},
    methods: {
			changeCategory(row){
				let dataList = this.addRow(row);
				let SelectRow = this.dealWithSkuList(dataList);
				this.$emit('updateProductSkuProperty', SelectRow);
				SelectRow = null;
			},
			initskuData (){
				let initskuList = new Array();
				let initListData = this.initListData();
				initListData.map(function(item,index){
					let obj = {};
					obj['productPrice'] = '';
					obj['productNumber'] = '';
					obj['productOnceSelect'] = false;
					obj['data'] = item;
					initskuList.push(obj);
				})
				return initskuList;
			},
			initListData (){
				let skuData = this.skuData;
				var valuesArr = new Array();
				skuData.map(function(item,index){
					return valuesArr.push(item.values);
				});
				let initskuData = new Array();
				let categoryfirst = valuesArr[0];
				for (let j=0;j<categoryfirst.length;j++) {
					let itemArr = [];
					itemArr.push(categoryfirst[j]);
					initskuData.push(itemArr);
				};
				for (let i=1;i<valuesArr.length;i++) {
					let categoryItem = valuesArr[i];
					let tempArr = [];
					for (let k=0;k<categoryItem.length;k++) {
						for (let h=0;h<initskuData.length;h++) {
							let itemArr = [];
							let aox = initskuData[h];
							for (let a=0;a<aox.length;a++) {
								itemArr.push(aox[a]);
							}
							itemArr.push(categoryItem[k]);
							tempArr.push(itemArr);
						};
					}
					initskuData = tempArr;
				}
				return initskuData;	
			},
    	addRow (row){
//    		console.log(JSON.stringify(row));
    		let DataList = this.initsku;
//  		console.log(JSON.stringify(initskuData));
    		DataList.forEach(function(item){
    			var booleanArr = [];
    			item['data'].map(function(innerItem,index){
    				if(innerItem['id'] === row['id'] && innerItem['name'] === row['name']){
    					innerItem['value'] = row['value'];
    				};
//  				console.log('-------------------');
//  				console.log(innerItem['value']);
//  				console.log(innerItem['value'].length);
//  				console.log(typeof innerItem['value'])
//  				console.log('-------------------');
    				if(innerItem['value']){
    					return booleanArr.push(true);
    				}else{
    					return booleanArr.push(false);
    				}
    			})
//  			console.log(booleanArr);
    			var truesNum = 0;
    			booleanArr.map(function(boolean){
    				if(boolean){
    					truesNum++;
    				}
    			})
    			if(truesNum === item['data'].length){
    				item['productOnceSelect'] = true;
    			}else{
    				item['productOnceSelect'] = false;
    			}
    		})
//    		console.log(JSON.stringify(DataList));
    		return DataList;
    	},
    	dealWithSkuList (dataList){
    		let list = dataList;
    		let returnArr = new Array();
    		dataList.forEach(function(item,index){
    			if(item.productOnceSelect){
    				returnArr.push(item);
    			}
    		})
    		return returnArr;
    	}
    }
    
  }

</script>

<style lang="scss">
	.product-sku{
		width: 100%;
		.skuItems{
			margin-left: 40px;
			width: auto;
			height: 50px;
			line-height: 50px;
			margin-bottom:10px;
    	.categoryTitle,.categoryContent{
    		float: left;
			}
			.categoryTitle{
				font-weight: bold;
			}
			.categoryContent{
				margin-left: 20px;
			}
		}
	}
</style>