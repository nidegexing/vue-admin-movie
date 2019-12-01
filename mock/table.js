import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|30': [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        author: 'name',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  },
  getDictByTypes: () => {
    const result = Mock.mock({
      status: 'ok',
      result: [
        [{
          code: "中国",
          label: "中国",
        }, {
          code: "美国",
          label: "美国",
        }],
        [{
          code: "FILM",
          label: "电影",
        }, {
          code: "TV",
          label: "电视剧",
        }]
      ]
    })
    return {
      code: 20000,
      data: result
    }
  },
  getMoviesByName: () => {
    const result = Mock.mock({
      status: 'ok',
      result: [
        {
          id: '0',
          movieType: '电影',
          name: '海上钢琴师',
          englishName: 'The Legend of 1900',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//image.baidu.com/image/movie/batman.jpg',
          shootArea: '',
          releaseDate: '美国',
          review: '',
          classifications: ['音乐'],
          tags: ['爵士乐']
        },
        {
          id: '1',
          movieType: '电影',
          name: '肖申克的救赎',
          englishName: 'The Shawshank Redemption',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//image.baidu.com/image/movie/batman.jpg',
          shootArea: '美国',
          releaseDate: '',
          review: '',
          classifications: ['励志'],
          tags: ['命运']
        }
      ]
    })
    return {
      code: 20000,
      data: result
    }
  },
  getSearchConditions: () => {
    const result = Mock.mock({
      status: 'ok',
      result: {
        movieTypes: [
          {label: "电影",},
          {label: "电视剧",}
        ],
        classifications: [
          {label: "剧情",},
          {label: "灾难",}
        ],
        tags: [
          {label: "爵士乐",},
          {label: "命运",}
        ],
      }
    })
    return {
      code: 20000,
      data: result
    }
  },
  getMoviesByConditions: () => {
    const result = Mock.mock({
      status: 'ok',
      result: [
        {
          id: '0',
          movieType: '电影',
          name: '海上钢琴师0',
          englishName: 'The Legend of 1900',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1045399481,1909554702&fm=15&gp=0.jpg',
          shootArea: '',
          releaseDate: '美国',
          review: '',
          classifications: ['音乐'],
          tags: ['爵士乐']
        },
        {
          id: '1',
          movieType: '电影',
          name: '肖申克的救赎0',
          englishName: 'The Shawshank Redemption',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575199836933&di=d9dfa59cea37fdcfa644ac4b06dbe1ee&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1967256125%2C3509068569%26fm%3D214%26gp%3D0.jpg',
          shootArea: '美国',
          releaseDate: '',
          review: '',
          classifications: ['励志'],
          tags: ['命运']
        },
        {
          id: '0',
          movieType: '电影',
          name: '海上钢琴师1',
          englishName: 'The Legend of 1900',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//image.dafenqi.online/image/movie/batman.jpg',
          shootArea: '',
          releaseDate: '美国',
          review: '',
          classifications: ['音乐'],
          tags: ['爵士乐']
        },
        {
          id: '1',
          movieType: '电影',
          name: '肖申克的救赎1',
          englishName: 'The Shawshank Redemption',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//photocdn.sohu.com/20080701/Img257860620.jpg',
          shootArea: '美国',
          releaseDate: '',
          review: '',
          classifications: ['励志'],
          tags: ['命运']
        },
        {
          id: '0',
          movieType: '电影',
          name: '海上钢琴师2',
          englishName: 'The Legend of 1900',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//image.dafenqi.online/image/movie/batman.jpg',
          shootArea: '',
          releaseDate: '美国',
          review: '',
          classifications: ['音乐'],
          tags: ['爵士乐']
        },
        {
          id: '1',
          movieType: '电影',
          name: '肖申克的救赎2',
          englishName: 'The Shawshank Redemption',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//photocdn.sohu.com/20080701/Img257860620.jpg',
          shootArea: '美国',
          releaseDate: '',
          review: '',
          classifications: ['励志'],
          tags: ['命运']
        },
        {
          id: '0',
          movieType: '电影',
          name: '海上钢琴师3',
          englishName: 'The Legend of 1900',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//image.dafenqi.online/image/movie/batman.jpg',
          shootArea: '',
          releaseDate: '美国',
          review: '',
          classifications: ['音乐'],
          tags: ['爵士乐']
        },
        {
          id: '1',
          movieType: '电影',
          name: '肖申克的救赎3',
          englishName: 'The Shawshank Redemption',
          filePath: 'D:\\movie\\The Legend of 1900.rmvb',
          pictureUrl: '//photocdn.sohu.com/20080701/Img257860620.jpg',
          shootArea: '美国',
          releaseDate: '',
          review: '',
          classifications: ['励志'],
          tags: ['命运']
        }
      ]
    })
    return {
      code: 20000,
      data: result
    }
  },
}
