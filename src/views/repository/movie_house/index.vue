<template>
  <div class="movie-house-container">
    <div class="search-container">
      <div class="search-item flex-horizontal">
        <div class="search-label double-height">名称搜索：</div>
        <el-input
          v-model="checkedCondition.searchName"
          class="search-input"
          @keyup.enter.native="getMoviesByConditions"
          placeholder="电影名/EngLishName"
          @blue="getMoviesByConditions"
          clearable
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="getMoviesByConditions"
          style="margin-left: 1rem;"
        >搜索
        </el-button>
      </div>
      <div class="search-item flex-horizontal">
        <div class="search-label">影视类型：</div>
        <div class="search-condition flex-horizontal">
        <span
          v-for="(item,index) in searchCondition.movieTypes" :key="index"
          class="search-condition-label"
          :class="{'is-checked':item.checked}"
          @click="refreshCheckedCondition(item,'movieType')"
        >{{item.label}}</span>
        </div>
      </div>
      <div class="search-item flex-horizontal">
        <div class="search-label">影视分类：</div>
        <div class="search-condition flex-horizontal">
        <span
          v-for="(item,index) in searchCondition.classifications" :key="index"
          class="search-condition-label"
          :class="{'is-checked':item.checked}"
          @click="refreshCheckedCondition(item,'classification')"
        >{{item.label}}</span>
        </div>
      </div>
      <div class="search-item flex-horizontal">
        <div class="search-label">影视标签：</div>
        <div class="search-condition flex-horizontal">
        <span
          v-for="(item,index) in searchCondition.tags" :key="index"
          class="search-condition-label"
          :class="{'is-checked':item.checked}"
          @click="refreshCheckedCondition(item,'tag')"
        >{{item.label}}</span>
        </div>
      </div>
    </div>
    <div class="move-container">
      <div
        class="movie-container flex-horizontal"
      >
        <div
          v-for="(item,index) in movieList" :key="index"
          class="movie-item"
          @click="handleShowDetail(item)"
        >
          <div
            class="movie-pic"
            :style="{backgroundImage:'url('+item.pictureUrl+')'}"
          />
          <div class="movie-name">{{item.name}}</div>
        </div>
      </div>
      <el-dialog
        title="我的影评"
        :visible.sync="showDetail"
        :close-on-click-modal="false"
        width="48rem"
      >
        <div
          class="movie-detail"
        >
          <h3>电影详情----》{{currentMovie.name}}《----电影详情</h3>
          {{currentMovie.review}}
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import * as apis from '../../../api/table'

  export default {
    name: 'movie-house',
    data() {
      return {
        searchCondition: {
          movieTypes: [{id: '0', label: '全部', checked: true}],
          classifications: [{id: '0', label: '全部', checked: true}],
          tags: [{id: '0', label: '全部', checked: true}],
        },
        checkedCondition: {
          searchName: '',
          movieTypes: ['全部'],
          classifications: ['全部'],
          tags: ['全部'],
        },
        movieList: [],
        currentMovie: {},
        showDetail: false
      }
    },
    created() {
      this.getSearchConditions()
    },
    methods: {
      getMoviesByConditions() {
        let sendData = this.checkedCondition
        apis.getList(sendData).then(response => {
          console.log('/movie/getMoviesByConditions', response.data)
          let respData = response.data;
          if (respData.status == 'ok') {
            this.movieList = respData.result
          } else {
            this.movieList = []
            this.$message.error("没有符合条件的影片！")
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getSearchConditions() {
        let sendData = {}
        apis.getList(sendData).then(response => {
          console.log('/movie/getSearchConditions', response.data)
          let respData = response.data;
          if (respData.status == 'ok') {
            let movieTypes = [{id: '0', label: '全部', checked: true}]
            this.constructConditions(movieTypes, respData.result.movieTypes)
            let classifications = [{id: '0', label: '全部', checked: true}]
            this.constructConditions(classifications, respData.result.classifications)
            let tags = [{id: '0', label: '全部', checked: true}]
            this.constructConditions(tags, respData.result.tags)
            this.searchCondition = {
              movieTypes: movieTypes,
              classifications: classifications,
              tags: tags
            }
            this.getMoviesByConditions()
          } else {
            this.$message.error("获取查询条件失败！")
          }
        }).catch(error => {
          console.log(error)
        })
      },
      constructConditions(sourceList, concatList) {
        concatList.forEach(item => {
          let copyItem = {checked: false}
          Object.assign(copyItem, item)
          sourceList.push(copyItem)
        })
        //console.log('sourceList---->', sourceList)
        return sourceList
      },
      refreshCheckedCondition(item, type) {
        switch (type) {
          case 'movieType':
            if (!item.checked) {//选中
              if (item.label == '全部') {
                //选中全部：遍历选项
                this.searchCondition.movieTypes.forEach(item => {
                  if (item.label == '全部') {
                    item.checked = true
                  } else {
                    item.checked = false
                  }
                })
                //重置List
                this.checkedCondition.movieTypes = ['全部']
              } else if (this.checkedCondition.movieTypes.length == 1
                && this.checkedCondition.movieTypes[0] == '全部') {
                //选中非全部的第一个
                //取消全部
                this.searchCondition.movieTypes[0].checked = false
                //重置List
                this.checkedCondition.movieTypes = []
                this.checkedCondition.movieTypes.push(item.label)
              } else {
                //选中非全部的非第一个
                this.checkedCondition.movieTypes.push(item.label)
              }
              item.checked = true
              //console.log('---->0', this.checkedCondition.movieTypes)
            } else {//取消：至少有一个是选中状态
              if (this.checkedCondition.movieTypes.length == 1) {
                if (this.checkedCondition.movieTypes[0] == '全部') {
                  //console.log('---->1')
                } else {
                  //console.log('---->2', this.checkedCondition.movieTypes)
                  //没有条件，选中全部
                  this.searchCondition.movieTypes[0].checked = true
                  this.checkedCondition.movieTypes = ['全部']
                  //取消后没有选中项，默认选中全部
                  item.checked = false
                }
              } else {
                //console.log('---->3')
                this.checkedCondition.movieTypes.splice(this.checkedCondition.movieTypes.indexOf(item.label))
                item.checked = false
              }
            }
            break
          case 'classification':
            if (!item.checked) {//选中
              if (item.label == '全部') {
                //选中全部：遍历选项
                this.searchCondition.classifications.forEach(item => {
                  if (item.label == '全部') {
                    item.checked = true
                  } else {
                    item.checked = false
                  }
                })
                //重置List
                this.checkedCondition.classifications = ['全部']
              } else if (this.checkedCondition.classifications.length == 1
                && this.checkedCondition.classifications[0] == '全部') {
                //选中非全部的第一个
                //取消全部
                this.searchCondition.classifications[0].checked = false
                //重置List
                this.checkedCondition.classifications = []
                this.checkedCondition.classifications.push(item.label)
              } else {
                //选中非全部的非第一个
                this.checkedCondition.classifications.push(item.label)
              }
              item.checked = true
              //console.log('---->0', this.checkedCondition.classifications)
            } else {//取消：至少有一个是选中状态
              if (this.checkedCondition.classifications.length == 1) {
                if (this.checkedCondition.classifications[0] == '全部') {
                  //console.log('---->1')
                } else {
                  //console.log('---->2', this.checkedCondition.classifications)
                  //没有条件，选中全部
                  this.searchCondition.classifications[0].checked = true
                  this.checkedCondition.classifications = ['全部']
                  //取消后没有选中项，默认选中全部
                  item.checked = false
                }
              } else {
                //console.log('---->3')
                this.checkedCondition.classifications.splice(this.checkedCondition.classifications.indexOf(item.label))
                item.checked = false
              }
            }
            break
          case 'tag':
            if (!item.checked) {//选中
              if (item.label == '全部') {
                //选中全部：遍历选项
                this.searchCondition.tags.forEach(item => {
                  if (item.label == '全部') {
                    item.checked = true
                  } else {
                    item.checked = false
                  }
                })
                //重置List
                this.checkedCondition.tags = ['全部']
              } else if (this.checkedCondition.tags.length == 1
                && this.checkedCondition.tags[0] == '全部') {
                //选中非全部的第一个
                //取消全部
                this.searchCondition.tags[0].checked = false
                //重置List
                this.checkedCondition.tags = []
                this.checkedCondition.tags.push(item.label)
              } else {
                //选中非全部的非第一个
                this.checkedCondition.tags.push(item.label)
              }
              item.checked = true
              //console.log('---->0', this.checkedCondition.tags)
            } else {//取消：至少有一个是选中状态
              if (this.checkedCondition.tags.length == 1) {
                if (this.checkedCondition.tags[0] == '全部') {
                  //console.log('---->1')
                } else {
                  //console.log('---->2', this.checkedCondition.tags)
                  //没有条件，选中全部
                  this.searchCondition.tags[0].checked = true
                  this.checkedCondition.tags = ['全部']
                  //取消后没有选中项，默认选中全部
                  item.checked = false
                }
              } else {
                //console.log('---->3')
                this.checkedCondition.tags.splice(this.checkedCondition.tags.indexOf(item.label))
                item.checked = false
              }
            }
            break
        }
        this.getMoviesByConditions()
      },
      handleShowDetail(item) {
        this.showDetail = true
        this.currentMovie = item
      }
    }
  }
</script>

<style lang="scss" scoped>
  $width-movie-item: 16rem;
  $height-movie-pic: 8rem;
  $background-color-white: rgba(255, 255, 255, 0.8);
  .movie-house-container {
    position: relative;
    padding: 1rem;

    .search-input {
      width: 30rem;
    }

    .move-container {
      position: relative;
      width: 100%;
    }

    .search-container {
      position: relative;
      font-size: 1rem;
      line-height: 1.5rem;
      background: $background-color-white;
      padding: 0.5rem;

      .search-item {
        align-items: center;

        & + .search-item {
          margin-top: 0.5rem;
        }

        .search-label {
          position: relative;
          width: 8rem;
          //background: lightcyan;
          &.double-height {
            line-height: 3rem;
          }
        }

        .search-condition {
          position: relative;
          flex: 1;

          .search-condition-label {
            padding: 0 0.5rem;
            border: 1px solid cornflowerblue;
            border-radius: 0.25rem;

            & + .search-condition-label {
              margin-left: 0.5rem;
            }

            &.is-checked {
              color: white;
              background: cornflowerblue;
              border: 1px solid black;
            }
          }
        }
      }
    }

    .movie-container {
      position: relative;
      width: 100%;
      margin-top: 1rem;

      .movie-item {
        position: relative;
        width: $width-movie-item;
        background: $background-color-white;
        margin: 0.25rem 0 0 0.25rem;

        .movie-pic {
          position: relative;
          width: $width-movie-item;
          height: $height-movie-pic;
          //background: url("//image.dafenqi.online/image/movie/batman.jpg") no-repeat center center;
          background: no-repeat center center;
          background-size: 100%;
        }

        /*https://image.dafenqi.online/image/background/bg-mainpage-mini.jpg*/
        .movie-name {
          text-align: center;
        }
      }

      &.show {
        left: 0;
        animation: move-right-list 2s ease-in-out;
      }

      &.hide {
        left: 100%;
        animation: move-left-list 2s ease-in-out;
      }
    }

    .movie-detail {
      position: relative;
      width: 100%;
      height: auto;
      min-height: 32rem;
      background: $background-color-white;

      .btn-back {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }

      &.show {
        left: 0;
        animation: move-left-detail 2s ease-in-out;
      }

      &.hide {
        left: 100%;
        animation: move-right-detail 2s ease-in-out;
      }
    }

    @keyframes move-left-detail {
      from {
        left: 100%;
      }
      to {
        left: 0;
      }
    }

    @keyframes move-left-list {
      from {
        left: 0;
      }
      to {
        left: 100%;
      }
    }

    @keyframes move-right-detail {
      from {
        left: 0;
      }
      to {
        left: 100%;
      }
    }

    @keyframes move-right-list {
      from {
        left: 100%;
      }
      to {
        left: 0;
      }
    }
  }
</style>
