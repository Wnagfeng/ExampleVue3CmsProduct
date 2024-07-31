export const BaseHeaderConfig = {
    queryParamsKey: ["name", "cellphone"]
}
export const userConfig = {
    pageName: "user",
    propsList: [
        {
            type: 'normal',
            label: "ID",
            prop: "id",
            minWidth: "60",
            align: 'center'
        },
        {
            type: 'normal',
            label: "用户名",
            prop: "username",
            minWidth: "150",
            align: 'center'
        },
        {
            type: 'normal',
            label: "手机号码",
            prop: "cellphone",
            minWidth: "150",
            align: 'center'
        },
        {
            type: 'normal',
            label: "角色",
            prop: "role_name",
            minWidth: "100",
            align: 'center'
        },
        {
            type: 'normal',
            label: "状态",
            prop: "state",
            minWidth: "105",
            align: 'center'
        },
        {
            type: 'normal',
            label: "真实姓名",
            prop: "realname",
            minWidth: "110",
            align: 'center'
        },
        {
            type: 'normal',
            label: "创建时间",
            prop: "created_at",
            minWidth: "170",
            align: 'center'
        },
        {
            type: 'normal',
            label: "修改时间",
            prop: "updated_at",
            minWidth: "170",
            align: 'center'
        },
        {
            type: 'handler',
            label: "操作",
            minWidth: "165px",
            align: 'center'
        }
    ]
}