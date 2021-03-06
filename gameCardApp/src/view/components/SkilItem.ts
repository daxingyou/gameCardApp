class SkilItem extends eui.ItemRenderer{

	private skillIcon:eui.Image;
	private skillTitle:eui.Image;
	private _skillId:number;
	private rect:eui.Rect;
	private numLab:eui.Label;
	private itemGroup:eui.Group;

	private cdTime:eui.Label;
	private cdGroup:eui.Group;
	private _isCd:boolean = false;
	public constructor() {
		super();
		this.skinName = "SkillItemSkin";
	}
	protected dataChanged(): void{
		this.rect.visible = false;
		this.numLab.visible = false;
		if(this.data.skillIcon){
			this.skillIcon.source = this.data.skillIcon;
		}
		if(this.data.skillTitle){
			this.skillTitle.source = this.data.skillTitle;
		}
		if(this.data.skillId){
			this._skillId = this.data.skillId;
		}
		this.cdGroup.visible = false;
	}
	private cdInterval;
	private count:number;
	public setCd():void{
		if(this.data.cd == 0){return}
		this.touchEnabled = false;
		this.touchChildren = false;
		// let cdTime:number = this.data.cd;
		this.cdGroup.visible = true;
		this.cdTime.text = this.data.cd.toString();
		this.count = 0;
		let self = this;
		this._isCd = true;
		this.cdInterval = setInterval(function() {
			self.count += 1;
			self.cdTime.text = (self.data.cd - self.count).toString();
			if(self.count >= self.data.cd){
				clearInterval(self.cdInterval);
				self._isCd = false;
				self.touchEnabled = true;
				self.count = 0;
				self.touchChildren = true;
				self.cdGroup.visible = false;
			}
	    }, 1000);
	}
	/**技能cd暂停 */
	public pauseCd():void{
		if(this.cdInterval){
			clearInterval(this.cdInterval);
			this.cdInterval = null;
		}
	}
	/**技能cd取消暂停 */
	public canclePause():void{
		if(this.data.cd && this.count < this.data.cd && !this.cdInterval){
			let self = this;
			this.cdInterval = setInterval(function() {
				self.count += 1;
				self.cdTime.text = (self.data.cd - self.count).toString();
				if(self.count >= self.data.cd){
					clearInterval(self.cdInterval);
					self._isCd = false;
					self.count = 0;
					self.touchEnabled = true;
					self.touchChildren = true;
					self.cdGroup.visible = false;
				}
			}, 1000);
		}
	}
	/**技能cd移除 */
	public removeCd():void{
		if(this.cdInterval){clearInterval(this.cdInterval)}
		this.cdGroup.visible = false;
		this.touchEnabled = true;
		this.touchChildren = true;
		this.count = 0;
		this._isCd = false;
		this.cdTime.text = "0";
	}
	public dongyixia():void{
		egret.Tween.get(this.itemGroup).to({rotation:this.itemGroup.rotation - 5},50).to({rotation:this.itemGroup.rotation + 5},50).to({rotation:this.itemGroup.rotation - 5},50).to({rotation:this.itemGroup.rotation + 5},50).call(()=>{
			this.itemGroup.rotation = 0;
			egret.Tween.removeTweens(this.itemGroup);
		},this)
	}
	public set num(value:number){
		this.numLab.visible = true;
		this.numLab.text = value.toString();
	}
	public get num():number{
		return parseInt(this.numLab.text);
	}
	public get isCd():boolean{
		return this._isCd;
	}
	public get skillId():number{
		return this._skillId;
	}
	public set focus(value){
		this.rect.visible = value
	}
}