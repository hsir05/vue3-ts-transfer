<template>
    <div class="transfer-wrap">
        <div class="transfer-item transfer-left">
            <div class="transfer-title">
                <span class="transfer-title-checkbox">
                    <input v-model="leftAllChecked" type="checkbox" class="checkbox" @click="toggleLeftAllCheckbox">
                    源项
                </span>
                <span>{{ leftSelectedData.length }}/{{ leftOptions.length }}</span>
            </div>
            <ul class="transfer-content">
                <li class="transfer-content-item" v-for="(item, index) in leftOptions" :key="item.value">
                    <input v-model="leftIsCheckedData[index]" type="checkbox" class="checkbox"
                        @click="toggleLeftCheckboxItem($event, item)">
                    {{ item.label }}
                </li>
            </ul>
        </div>
        <div class="transfer-middle">
            <div><button type="button" class="btn  tansfer-btn" @click="toggleRight">右移</button></div>
            <div><button type="button" class="btn tansfer-btn mt-10px" @click="toggleLeft">左移</button></div>
        </div>
        <div class="transfer-item transfer-right">
            <div class="transfer-title">
                <span class="transfer-title-checkbox">
                    <input type="checkbox" v-model="rightAllChecked" :disabled="rightOptions.length > 0 ? false : true " class="checkbox" @click="toggleRightAllCheckbox">
                    目标项
                </span>
                <span>{{rightSelectedData.length}}/{{rightOptions.length}}</span>
            </div>
            <ul class="transfer-content">
                <li class="transfer-content-item" v-for="(item, index) in rightOptions" :key="item.value">
                <input v-model="rightIsCheckedData[index]" type="checkbox" class="checkbox"
                        @click="toggleRightCheckboxItem($event, item)">{{ item.label }}</li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue'
interface DataInter {
    label: string | number;
    value: string | number
}
type selectedItemInter = string | number

const props = defineProps({
    options: {
        type: Array as PropType<DataInter[]>,
        default: () => []
    },
    value: {
        type: Array as PropType<selectedItemInter[]>,
        default: () => []
    }
})
const { options } = toRefs(props)
// 左侧选中的数据
const leftOptions = ref<DataInter[]>([])
leftOptions.value = options.value
const leftSelectedData = ref<DataInter[]>([])
const leftAllChecked = ref(false)
const leftIsCheckedData = ref<boolean[]>([])

// 右侧选中的数据
const rightSelectedData = ref<DataInter[]>([])
//右侧数据
const rightAllChecked = ref(false)
const rightOptions = ref<DataInter[]>([])
const rightIsCheckedData = ref<boolean[]>([])

function getLeftCheckedData(bool = false) {
    leftIsCheckedData.value = []
    for (let i = 0; i < leftOptions.value.length; i++) {
        leftIsCheckedData.value.push(bool)
    }
}
// 左侧checkbox初始化
getLeftCheckedData()
// 左侧单个checkbox选择功能
function toggleLeftCheckboxItem(e: MouseEvent, key: DataInter) {
    if ((e.target as HTMLInputElement).checked) {
        leftSelectedData.value.push(key)
    } else {
        let index = leftSelectedData.value.findIndex((item: DataInter) => item.value === key.value)
        if (index >= 0) {
            leftSelectedData.value.splice(index, 1)
        }
    }
    if (leftSelectedData.value.length === leftOptions.value.length) {
        leftAllChecked.value = true
    } else {
        leftAllChecked.value = false
    }
}
// 左侧全选
function toggleLeftAllCheckbox(e: MouseEvent) {
    leftSelectedData.value = []
    getLeftCheckedData((e.target as HTMLInputElement).checked)
    if ((e.target as HTMLInputElement).checked) {
        for (let key of leftOptions.value) {
            leftSelectedData.value.push(key)
        }
    }
}

function getRightCheckedData(bool = false) {
    rightIsCheckedData.value = []
    for (let i = 0; i < rightOptions.value.length; i++) {
        rightIsCheckedData.value.push(bool)
    }
}
// 右侧checkbox初始化
getRightCheckedData()
// 右侧单个checkbox选择功能
function toggleRightCheckboxItem(e: MouseEvent, key: DataInter) {
    
    if ((e.target as HTMLInputElement).checked) {
        rightSelectedData.value.push(key)
    } else {
        let index = rightSelectedData.value.findIndex((item:DataInter) => item.value === key.value)
        console.log('index', index);
        if (index >= 0) {
            rightSelectedData.value.splice(index, 1)
            console.log(rightSelectedData.value.length);
            
        }
    }
    
    if (rightSelectedData.value.length === rightOptions.value.length) {
        rightAllChecked.value = true
    } else {
        rightAllChecked.value = false
    }
}
// 右侧全选
function toggleRightAllCheckbox(e: MouseEvent) {
    rightSelectedData.value = []
    getRightCheckedData((e.target as HTMLInputElement).checked)
    if ((e.target as HTMLInputElement).checked) {
        for (let key of rightOptions.value) {
            rightSelectedData.value.push(key)
        }
    }
}

// 数据穿梭

// 左-》右
const emit = defineEmits(["update:value"]);
function toggleRight(){
    let result:DataInter[] = [];
    leftOptions.value.forEach((item: DataInter) => {
        let index = leftSelectedData.value.findIndex((key: DataInter) => item.value === key.value)
        if (index < 0) {
            result.push(item)
        }
    })
    leftOptions.value = result
    let arr = JSON.parse(JSON.stringify(leftSelectedData.value))
    leftSelectedData.value = []
    rightOptions.value = [...rightOptions.value, ...arr]
    getLeftCheckedData()

     if (leftOptions.value.length === 0) {
        leftAllChecked.value = false
    }
    const value = rightOptions.value.map((item:DataInter) => item.value)
    emit("update:value", value)
}

function toggleLeft(){
    let result:DataInter[] = [];
    rightOptions.value.forEach((item: DataInter) => {
        let index = rightSelectedData.value.findIndex((key: DataInter) => item.value === key.value)
        if (index < 0) {
            result.push(item)
        }
    })
    rightOptions.value = result
    let arr = JSON.parse(JSON.stringify(rightSelectedData.value))
    rightSelectedData.value = []
    leftOptions.value = [...leftOptions.value, ...arr]
    getRightCheckedData()
    if (rightOptions.value.length === 0) {
        rightAllChecked.value = false
    }
    const value = rightOptions.value.map((item:DataInter) => item.value)
    emit("update:value", value)
}

</script>
<style scoped lang="scss">
ul,
li {
    margin: 0;
    padding: 0;
    list-style: none;
}

.transfer-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 14px;

    .transfer-title {
        display: flex;
        align-items: center;
        padding: 8px 15px;
        justify-content: space-between;
        background-color: #fafafc;
    }

    .transfer-title-checkbox {
        display: inline-flex;
        align-items: center;
    }

    .transfer-item {
        width: 230px;
        height: 350px;
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        overflow: hidden;
    }

    .checkbox {
        margin-right: 8px;
        width: 18px;
        color: #e9e9e9;
    }

    .transfer-content {
        height: calc(350px - 39px);
        overflow-y: auto;
    }

    .transfer-content-item {
        padding: 8px 15px;
        text-align: left;
        display: inline-flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
            background-color: #f3f3f5;
        }
    }

    .transfer-middle {
        padding: 0 10px;
    }

    .btn {
        margin: 0;
        line-height: 1;
        font-family: inherit;
        padding: 10px 14px;
        width: 50px;
        display: inline-flex;
        font-size: 14px;
        border-radius: 4px;
        color: #333639;
        border: 1px solid #e0e0e6;
        background-color: #0000;
        white-space: nowrap;
        outline: none;
        justify-content: center;
        user-select: none;
        text-align: center;
        cursor: pointer;
        text-decoration: none;

        &:hover {
            border-color: #18a058;
        }
    }

    .mt-10px {
        margin-top: 10px;
    }
}
</style>

