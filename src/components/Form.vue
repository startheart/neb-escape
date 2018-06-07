<template>
  <div class="form">
    <!-- Form -->

    <el-dialog title="请填写游戏账号" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="Neb 钱包地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" auto-complete="off" placeholder="输入钱包地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkAddr = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('钱包地址不能为空'));
      }
      setTimeout(() => {
        if (!Account.isValidAddress(value)) {
          callback(new Error('请输入正确钱包地址'));
        } else {
          callback();
        }
      }, 1000);
    }

    return {
      form: {
        address: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      rules: {
        address: [
          { validator: checkAddr, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    show: function () {
      this.dialogFormVisible = true
    },
    submitForm: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('onSubmitSuccess', this.form)
        } else {
          return false;
        }
      })
    },
    resetForm() {
      this.$refs['form'].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
