<template>
  <div class="app-container">
    <div class="edit-title">MovieEdit</div>
    <div class="detail-container">
      <el-scrollbar class="my-scrollbar">
        <div class="search-container flex-horizontal">
          <el-tag>搜索名称:</el-tag>
          <el-input
            v-model="searchName"
            @keyup.enter.native="handleGetMoviesByName"
            placeholder="电影名/EngLishName"
            class="search-name"
            size="mini"
          />
          <el-select
            v-model="formData.id"
            placeholder="SearchResult"
            class="search-result"
            @change="handleShowCheckResult"
            size="mini"
          >
            <el-option
              v-for="(item, index) in searchResult" :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="form-container">
          <el-form :inline="true"
                   :model="formData"
                   :rules="rules"
                   label-width="10rem"
                   :label-position="'right'"
                   size="mini"
                   ref="ruleForm"
          >
            <!--common info-->
            <div>
              <el-form-item label="ID" prop="id">
                <el-input
                  v-model="formData.id" placeholder="ID"
                  readonly
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="MovieType" prop="movieType">
                <el-select v-model="formData.movieType" placeholder="MovieType">
                  <el-option
                    v-for="(item, index) in movieTypeDict" :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="Name" prop="name">
                <el-input v-model="formData.name" placeholder="Name"/>
              </el-form-item>
              <el-form-item label="EngLishName">
                <el-input v-model="formData.englishName"/>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="FilePath">
                <el-input v-model="formData.filePath" class="file-path"/>
              </el-form-item>
              <el-form-item label="PictureUrl">
                <el-input v-model="formData.pictureUrl" class="file-path"/>
              </el-form-item>
            </div>
            <!--classification info-->
            <div>
              <el-form-item label="Classification" prop="classification">
                <el-tag
                  v-for="(classification,index) in formData.classifications" :key="index"
                  closable
                  size="medium"
                  @close="handleCloseClass(classification)"
                  class="my-tag"
                >
                  {{classification}}
                </el-tag>
                <el-input
                  v-if="inputVisibleClass"
                  class="tag-item"
                  v-model="inputValueClass"
                  ref="saveInputClass"
                  size="small"
                  @keyup.enter.native="handleInputConfirmClass"
                  @blur="handleInputConfirmClass"
                />
                <el-button
                  v-else
                  class="tag-item"
                  size="mini"
                  @click="showInputClass"
                >+ New Tag
                </el-button>
              </el-form-item>
            </div>
            <!--tag info-->
            <div>
              <el-form-item label="Tag" prop="tag">
                <el-tag
                  v-for="(tag,index) in formData.tags" :key="index"
                  closable
                  size="medium"
                  @close="handleCloseTag(tag)"
                  class="my-tag"
                >
                  {{tag}}
                </el-tag>
                <el-input
                  v-if="inputVisibleTag"
                  class="tag-item"
                  v-model="inputValueTag"
                  ref="saveInputTag"
                  size="small"
                  @keyup.enter.native="handleInputConfirmTag"
                  @blur="handleInputConfirmTag"
                />
                <el-button
                  v-else
                  class="tag-item"
                  size="mini"
                  @click="showInputTag"
                >+ New Tag
                </el-button>
              </el-form-item>
            </div>
            <!--costume info-->
            <div>
              <el-form-item label="ShootArea" prop="shootArea">
                <el-select v-model="formData.shootArea" placeholder="ShootArea">
                  <el-option
                    v-for="(item, index) in shootAreaDict" :key="index"
                    :label="item.label"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="ReleaseDate" prop="releaseDate">
                <el-date-picker
                  v-model="formData.releaseDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="Review" prop="review">
                <el-input
                  v-model="formData.review"
                  placeholder="Review"
                  type="textarea"
                  :rows="2"
                  class="file-path"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="docker-control">
          <el-button type="primary" @click="onSubmit" size="small">Save</el-button>
          <el-button type="info" @click="reSet" size="small">Reset</el-button>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import * as apis from '../../api/table'

  export default {
    name: "movie-edit",
    data() {
      return {
        searchName: '',
        searchResult: [],
        formData: {
          //common info
          editType: '',
          id: '',
          movieType: '电影',
          name: '海上钢琴师',
          englishName: 'The Legend of 1900',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//image.dafenqi.online/image/movie/batman.jpg',
          shootArea: '',
          releaseDate: '',
          review: '',
          classifications: [],
          tags: []
        },
        inputVisibleClass: false,
        inputValueClass: '',
        inputVisibleTag: false,
        inputValueTag: '',
        rules: {},
        shootAreaDict: [],
        movieTypeDict: [],
      }
    },
    created() {
      this.initDicts()
    },
    methods: {
      onSubmit() {
        //console.log('onSubmit---->', this.formData)
        //return
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.formData.id) {
              this.formData.editType = 'update'
            } else {
              this.formData.editType = 'add'
            }
            //调用api接口
            apis.getList(this.formData).then(res => {
              let data = res.data;
              console.log("/movie/updateItem", data.result);
              if (data.status == 'ok') {
                this.$message.success('success');
                this.reSet()
              } else {
                this.$message.error(data.result);
              }
            }).catch(error => {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
          }
        });
      },
      reSet() {
        this.formData = {
          //common info
          editType: '',
          id: '',
          movieType: '电影',
          name: '',
          englishName: 'The Legend of 1900',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//image.dafenqi.online/image/movie/batman.jpg',
          shootArea: '',
          releaseDate: '',
          review: '',
          classifications: [],
          tags: []
        }
      },
      handleInputConfirmClass() {
        let inputValueClass = this.inputValueClass
        if (inputValueClass) {
          this.formData.classifications.push(inputValueClass)
        }
        this.inputVisibleClass = false
        this.inputValueClass = ''
      },
      handleInputConfirmTag() {
        let inputValueTag = this.inputValueTag
        if (inputValueTag) {
          this.formData.tags.push(inputValueTag)
        }
        this.inputVisibleTag = false
        this.inputValueTag = ''
      },
      handleCloseClass(tag) {
        this.formData.classifications.splice(this.formData.classifications.indexOf(tag), 1);
      },
      handleCloseTag(tag) {
        this.formData.tags.splice(this.formData.tags.indexOf(tag), 1);
      },
      showInputClass() {
        this.inputVisibleClass = true;
        this.$nextTick(_ => {
          this.$refs.saveInputClass.$refs.input.focus();
        });
      },
      showInputTag() {
        this.inputVisibleTag = true;
        this.$nextTick(_ => {
          this.$refs.saveInputTag.$refs.input.focus();
        });
      },
      getType(index) {
        if (index % 5 == 0) return '';
        if (index % 5 == 1) return 'success';
        if (index % 5 == 2) return 'info';
        if (index % 5 == 3) return 'warning';
        if (index % 5 == 4) return 'danger';
      },
      initDicts() {
        //调用api接口
        let sendData = {
          dictTypes: ['country_area_string', 'movie_type']
        }
        apis.getList(sendData).then(res => {
          console.log("/commonTable/getDictByTypes", res.data);
          let respData = res.data.result
          if (res.data.status == 'ok') {
            this.shootAreaDict = respData[0]
            this.movieTypeDict = respData[1]
          }
        }).catch(error => {
          console.log(error);
        });
      },
      handleGetMovieByid(val) {
        //console.log('handleGetMovieByid---->', val)
        let sendData = {
          id: this.formData.id
        }
        //调用api接口
        apis.getList(sendData).then(res => {
          let data = res.data;
          console.log("/movie/getMovieByid", data.result);
          if (data.status == 'ok') {
            this.formData = data.result
          } else {
            this.$message.error(data.result);
          }
        }).catch(error => {
          console.log(error);
        });
      },
      handleGetMoviesByName() {
        if (this.searchName == '') {
          this.searchResult = []
          this.reSet()
          return
        }
        let sendData = {
          searchName: this.searchName
        }
        //调用api接口
        apis.getList(sendData).then(res => {
          let data = res.data;
          console.log("/movie/getMoviesByName", data.result);
          if (data.status == 'ok') {
            this.searchResult = data.result
            if (this.searchResult.length > 0) {
              this.formData = this.searchResult[0]
            }
          } else {
            this.$message.error(data.result);
          }
        }).catch(error => {
          console.log(error);
          this.searchResult = []
          this.reSet()
        });
      },
      handleShowCheckResult(checkId) {
        for (let i = 0; i < this.searchResult.length; i++) {
          let movieItem = this.searchResult.length[i]
          if (movieItem.id == checkId) {
            this.formData = movieItem
            return
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    .edit-title {
      position: relative;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
      line-height: 2rem;
    }
    .detail-container {
      position: relative;
      height: calc(100% - 2rem);
      padding: 1rem 0;
      background: rgba(255, 255, 255, 0.6);

      .search-container {
        justify-content: center;

        .search-name {
          width: 16rem;
          margin-left: 1rem;
        }

        .search-result {
          width: 12rem;
          margin-left: 1rem;
        }
      }
      .form-container {
        margin-top: 1rem;

        .file-path {
          width: 36rem;
        }

        .my-tag {
          color: black;
        }
      }
      .docker-control {
        position: relative;
        margin: 1rem 0;
        text-align: center;
      }
    }
  }
</style>
