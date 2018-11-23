## @ek/utils

### utils

### decorators

### service

#### HttpAdapter
- 解耦请求库和服务类
- 内置AxiosHttpAdapter

#### Service Decorator
- 通过修饰器修饰服务类：Service
- 方法修饰器：Get、Post、Update、Delete、Options
- 方法参数修饰器：Params、Body
## Useage
```javascript
// http适配器
import axios from 'axios'
class HttpAdapter {
  constructor (config) {
    this._http = axios.create(config)
  }
}

const axiosHttpAdapter = new HttpAdapter()

// 服务类
// 若修饰类方法时，可不带config，默认使用类的config；若带则根据config创建继承于类的新http实例
@Inject({
  http: axiosHttpAdapter
})
class BaseService {}

@Service('user', config)
class UserService extends BaseService {
  @Params({ v: '1.5' })
  @Get('list', config)
  findUser (response) {
    return response
  }

  @Config(config)
  @Body({ id: 1 })
  @Post('add', config)
  addUser (response) {
    return response
  }
}
```