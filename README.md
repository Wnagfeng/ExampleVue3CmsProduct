## 日志：
后端地址：https://github.com/Wnagfeng/ExampleKoa2Cms

当前系统版本

win10

node  --v18.12.0

前端也没啥好说的 做个日志

除了crud还是crud 没啥意思 本来讲抽取高阶组件的 但是没有抽取 没什么用理解了就行了 我今天最后一个需求 完成公共请求的封装 就是保证写一个获取list的接口 能在三个页面中用 那我就会了 然后做一下权限控制 就结束了 

## 难点

```ts
function filterMenu(menuList, menuIds) {
  return menuList.reduce((filteredMenu, menuItem) => {
    // 递归处理子菜单项
    if (menuItem.children) {
      menuItem.children = filterMenu(menuItem.children, menuIds);
    }
    
    // 检查当前菜单项的 id 是否在 menuIds 列表中
    if (menuIds.includes(menuItem.id)) {
      filteredMenu.push(menuItem);
    }

    return filteredMenu;
  }, []);
}
```

## 问题：

types文件乱写 到处都是 

menu高亮没有与路由绑定 应该不难 老项目都写过 

## 学到的东西：

抽取接口 

```ts
// 定义通用的返回数据类型接口
export interface UnifiedResponse<T> {
  code: number;
  totalCount: number;
  message: string;
  data: T[];
}

// 示例接口函数
export function GetList<T>(url: string): Promise<UnifiedResponse<T>> {
  return wfrequest.post<UnifiedResponse<T>>({
    url
  });
}

// 调用接口时指定返回值类型
GetList<UserList>("/user/list").then(response => {
  console.log(response.data); // 类型是 UserList[]
});

GetList<DepartmentList>("/department/list").then(response => {
  console.log(response.data); // 类型是 DepartmentList[]
});
```

store的拦截

```ts
RoleStore.$onAction(({ name, after }) => {
    after(() => {
        if (
            name == 'DeleteRole' ||
            name == 'FetchPatchAndCreateRole'
        ) {
            currentPage.value = 1
        }
    })
});
```

el-tree的回显

```ts
    <el-tree ref="treeRef" :data="MenuListData" show-checkbox node-key="id" highlight-current
    :props="{ children: 'children', label: 'name' }" @check="handleCheckClick" />

        
const treeRef = ref<any>(null);

const handleCreate = () => {
    isCreate.value = true;
    formData.value = { name: '', intro: '' };
    centerDialogVisible.value = true;
    nextTick(() => treeRef.value?.setCheckedKeys([]));
};

const editRole = async (row: any) => {
    isCreate.value = false;
    centerDialogVisible.value = true;
    treeRef.value?.setCheckedKeys([]);
    formData.value = { name: row.name, intro: row.intro };

    const RoleMenuList = await RoleStore.FetchGetRoleForId(row.id);
    const selectedIds = mapMenuListToIds(RoleMenuList);
    nextTick(() => treeRef.value?.setCheckedKeys(selectedIds));
};

```

我tm是万万没想到 数据直接放进去就能展示 回显 也是如此的容易



