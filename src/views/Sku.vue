<template>
	<div class="sku">
		<div class="productSku-item">
			<p class="productSku-item-title">商品规格</p>
			<product-sku  :skuData="skuData" @updateProductSkuProperty="updateProductSkuProperty"></product-sku>
		</div>
		
		<div>
			<p class="productSku-item-title">商品销售规格</p>
			<div>
				<table border="0" cellspacing="0" cellpadding="0" style="width:100%">
					<thead>
						<tr class="table-tr">
							<template v-for="productCate in skuData">
								<th colspan="1" rowspan="1" class="">
									<div class="">{{productCate.catePropertyName}}</div>
								</th>
							</template>
							<th colspan="1" rowspan="1" class="">
								<div class="">价格</div>
							</th>
							<th colspan="1" rowspan="1" class="">
								<div class="">库存</div>
							</th>
						</tr>
					</thead>

					<tbody>
						<template v-for="product in productSkuTable">
							<tr class="table-tr">
								<td v-for="item in product.data">
									<div>{{item.value}}</div>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import ProductSku from './../components/ProductSku.vue';
	export default {
		components:{
			ProductSku
		},
		data(){
			return {
				skuData:[{
		          cateConnector:"",
		          catePropertyInputLimit:0,
		          catePropertyName:"颜色",
		          catePropertyParentId:"0",
		          catePropertyRequired:1,
		          catePropertySelection:1,
		          catePropertyType:2,
		          catePropertyUnit:"",
		          productCatePropertyId:"14",
		          sort: 0,
		          options:[{
		            catePropertyValue:"红色",
		            productCatePropertyValuesId:"11"
		          },{
		            catePropertyValue:"黄色",
		            productCatePropertyValuesId:"12"
		          },{
		            catePropertyValue:"黑色",
		            productCatePropertyValuesId:"12"
		          }],
		          values:[{
		            id: '111',
		            name: '颜色',
		            value: ''
		          },{
		            id: '132',
		            name: '颜色',
		            value: ''
		          },{
		            id: '155',
		            name: '颜色',
		            value: ''
		          }]
		        },{
		          cateConnector:"",
		          catePropertyInputLimit:0,
		          catePropertyName:"尺寸",
		          catePropertyParentId:"0",
		          catePropertyRequired:1,
		          catePropertySelection:1,
		          catePropertyType:2,
		          catePropertyUnit:"",
		          productCatePropertyId:"14",
		          sort: 0,
		          options:[{
		            catePropertyValue:"M",
		            productCatePropertyValuesId:"21"
		          },{
		            catePropertyValue:"L",
		            productCatePropertyValuesId:"22"
		          },{
		            catePropertyValue:"XL",
		            productCatePropertyValuesId:"23"
		          }],
		          values:[{
		            id: '244',
		            name: '尺寸',
		            value: ''
		          },{
		            id: '255',
		            name: '尺寸',
		            value: ''
		          },{
		            id: '266',
		            name: '尺寸',
		            value: ''
		          }]
		        },{
		          cateConnector:"",
		          catePropertyInputLimit:0,
		          catePropertyName:"性别",
		          catePropertyParentId:"0",
		          catePropertyRequired:1,
		          catePropertySelection:1,
		          catePropertyType:2,
		          catePropertyUnit:"",
		          productCatePropertyId:"14",
		          sort: 0,
		          options:[{
		            catePropertyValue:"男",
		            productCatePropertyValuesId:"35"
		          },{
		            catePropertyValue:"女",
		            productCatePropertyValuesId:"36"
		          },{
		            catePropertyValue:"人妖",
		            productCatePropertyValuesId:"37"
		          }],
		          values:[{
		            id: '333',
		            name: '性别',
		            value: ''
		          },{
		            id: '334',
		            name: '性别',
		            value: ''
		          },{
		            id: '345',
		            name: '性别',
		            value: ''
		          }]
		        }],
				productSkuTable:[],
			}
		},
		methods:{
			updateProductSkuProperty(data){
				this.productSkuTable = data;
			}
		}
	}
</script>

<style lang='scss'>
	.sku{
		width: 100%;
		height: 600px;
		.productSku-item-title{
			text-align: left;
		}
		.table-tr{
			height: 45px;
			line-height: 45px;
		}
		td{
			text-align: center;
		}
	}
</style>
