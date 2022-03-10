import {AdvChatbotHelper} from './adv-chatbot.helper';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {LsnAdvChatbotModule} from './adv-chatbot.module';
import {AdvChatbotDataProvider} from './adv-chatbot.model';
import {of} from 'rxjs';

describe('AdvChatbotHelper', () => {
  let helper: AdvChatbotHelper;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LsnAdvChatbotModule.forRoot()]
    }).compileComponents();
    helper = TestBed.inject(AdvChatbotHelper);
  });
  it('should properly merge data from providers', fakeAsync(async () => {
    (helper as any).dataProviders = [{
      getData: () => of({data1: 1})
    }, {
      getData: () => of({data2: 2})
    }] as AdvChatbotDataProvider[];
    const data = await (helper as any).getDataForWidget().toPromise();
    console.log(data);
    expect(data.data1).toBeDefined();
    expect(data.data2).toBeDefined();
  }));
});
