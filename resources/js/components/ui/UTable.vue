<template>
    <div class="styled-table__wrapper">
        <table class="styled-table">
            <tr>
                <th 
                    v-for="(header, key) in headers" 
                    :key="key"
                    :class="{'sortable': header.sorted, 'sorted-desc': sortBy === header.label && sortDesc}"
                    @click="header.sorted && onSort(header.label, !sortDesc)"
                >
                    <slot :name="`header-${header.label}`" :header="header">
                        {{ header.text || header.label }}
                    </slot>
                </th>
            </tr>
            <template v-if="isLoading">
                <tr>
                    <td :colspan="headers.length">
                        загрузка
                    </td>
                </tr>
            </template>
            <template v-else-if="rows.length">
                <tr v-for="row in rows" :key="row.id">
                    <td v-for="(header, key) in headers" :key="`${key}_${row.id}`">
                        <slot :name="`cell-${header.label}`" :row="row">
                            {{ row[header.label] }}
                        </slot>
                    </td>
                </tr>
            </template>
            <template v-else>
                <tr>
                    <td :colspan="headers.length">
                        Нет элементов
                    </td>
                </tr>
            </template>
        </table>
        <slot name="pagination" />
    </div>
</template>

<script>
export default {
    props: {
        headers: {
            type: Array,
            required: true
        },
        rows: Array,
        isLoading: {
            type: Boolean,
            default: false
        },
        sortBy: {
            type: String,
            default: 'id'
        },
        sortDesc: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onSort (sortBy, sortDesc) {
            this.$emit('sort', {sortBy, sortDesc})
        },
        parseDate (date) {
            const _date = new Date(date)
            return isNaN(_date.getDate()) ? 'Дата инвалид' : `${_date.getDate()}.${_date.getMonth() + 1}.${_date.getFullYear()}`
        }
    }
}
</script>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.styled-table th {
  background-color: #f2f2f2;
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  cursor: pointer;
}

.styled-table td {
  border: 1px solid #dddddd;
  padding: 8px;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.styled-table th.sortable::after {
  content: '\25B2';
  padding-left: 5px;
}

.styled-table th.sorted-desc::after {
  content: '\25BC';
}

@media (max-width: 500px) {
    .styled-table__wrapper {
        overflow-x: scroll;
    }
}
</style>
